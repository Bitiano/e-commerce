import { addToCart } from '../cart/cart.js';

document.addEventListener('DOMContentLoaded', async () => {
    const message = document.getElementById('message');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.error('ID do produto não fornecido');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/produto/listaProduto/${productId}`);
        if (response.ok) {
            const product = await response.json();
            renderProductDetails(product);
        } else {
            message.textContent = "Erro ao buscar detalhes do produto. Tente novamente mais tarde.";
            console.log('Erro :', response);
        }
    } catch (error) {
        console.error('Erro :', error);
        message.textContent = "Erro ao buscar detalhes do produto. Tente novamente mais tarde.";
    }

    function renderProductDetails(product) {
        document.getElementById('product-name').textContent = product.nome;
        document.getElementById('product-description').textContent = product.descricao;
        document.getElementById('product-price').textContent = `R$${product.preco.toFixed(2)}`;
        document.getElementById('product-rating-value').textContent = `Avaliação: ${product.avaliacao.toFixed(1)}`;

        const carouselImages = document.getElementById('carousel-images');
        product.imagesPath.forEach(imagem => {
            const imgElement = document.createElement('img');
            imgElement.src = imagem;
            carouselImages.appendChild(imgElement);
        });

        document.getElementById('buy-btn').addEventListener('click', () => {
            addToCart(product);
            alert('Produto adicionado ao carrinho');
        });

        initializeCarousel();
    }

    function initializeCarousel() {
        const carouselImages = document.getElementById('carousel-images');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        let currentIndex = 0;

        function showImage(index) {
            const images = carouselImages.querySelectorAll('img');
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselImages.querySelectorAll('img').length - 1;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < carouselImages.querySelectorAll('img').length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex);
        });

        showImage(currentIndex);
    }
});