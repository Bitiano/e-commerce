import { addToCart } from '../cart/cart.js';

document.addEventListener('DOMContentLoaded', () => {
    const productCardsContainer = document.getElementById('product-cards');
    const paginationControls = document.getElementById('pagination-controls');
    const message = document.getElementById('message');
    let currentPage = 0;
    const pageSize = 10;

    async function fetchProducts(page) {
        try {
            const response = await fetch(`http://localhost:8080/produto/buscaProdutos?page=${page}&size=${pageSize}`);
            if (response.ok) {
                const data = await response.json();
                console.log( data);
                if (data && data.produtos) {
                    renderProductCards(data.produtos);
                    renderPaginationControls(data.totalPages, page);
                } else {
                    message.textContent = "Erro ao buscar produtos. Tente novamente mais tarde.";  
                    console.log('Erro :', data);                  
                }
            } else {
                message.textContent = "Erro ao buscar produtos. Tente novamente mais tarde.";
                console.log('Erro :', response);
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            message.textContent = "Erro ao buscar produtos. Tente novamente mais tarde.";
        }
    }

    function renderProductCards(products) {
        productCardsContainer.innerHTML = '';
        products.forEach(product => {
            if (product.status === true) {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.imagesPath}" alt="${product.nome}">
                    <h2>${product.nome}</h2>
                    <p>R$${product.preco.toFixed(2)}</p>
                    <button class="btn-add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
                    <a href="product-details.html?id=${product.id}" class="btn-details">Ver detalhes</a>
                `;
                productCardsContainer.appendChild(productCard);
            }
        });

        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const product = products.find(p => p.id == productId);
                addToCart(product);
                alert('Produto adicionado ao carrinho!');
            });
        });
    }

    function renderPaginationControls(totalPages, currentPage) {
        paginationControls.innerHTML = '';

        for (let i = 0; i < totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i + 1;
            button.disabled = i === currentPage;
            button.addEventListener('click', () => {
                fetchProducts(i);
            });
            paginationControls.appendChild(button);
        }
    }

    fetchProducts(currentPage);
});