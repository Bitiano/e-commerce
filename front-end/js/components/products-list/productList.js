document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType'); 

    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search');
    const messageElement = document.getElementById('message');
    const modal = document.getElementById('product-preview-modal');
    const modalContent = document.getElementById('product-preview-content');
    const closeModal = document.getElementsByClassName('close')[0];

    closeModal.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    async function fetchProducts(nomeFiltro = '') {
        try {
            const response = await fetch(`http://localhost:8080/produto/buscaProdutos?nomeFiltro=${nomeFiltro}&token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const products = await response.json();
                return products;
            } else {
                messageElement.textContent = `Erro ao buscar produtos`;
                messageElement.style.color = 'red';
                return [];
            }
        } catch (error) {
            messageElement.textContent = `Erro ao buscar produtos`;
            messageElement.style.color = 'red';
            return [];
        }
    }

    function renderProductList(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
            <td>${product.code}</td>
            <td>${product.nome}</td>
            <td>${product.qtdEstoque}</td>
            <td>R$${product.preco}</td>
            <td>${product.status ? 'Ativo' : 'Inativo'}</td>
            <td>
                <button class="btn btn-edit" data-id="${product.id}">Editar</button>
                ${userType !== 'ESTOQUISTA' ? `
                <button class="btn btn-toggle-status" data-id="${product.id}" data-status="${product.status}">
                    ${product.status ? 'Inativar' : 'Ativar'}
                </button>
                <button class="btn btn-view" data-id="${product.id}">Visualizar</button>
                ` : ''}
            </td>
        `;
            productList.appendChild(productRow);
        });

        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                window.location.href = `edit-product.html?id=${productId}`;
            });
        });

        if (userType !== 'ESTOQUISTA') {
            document.querySelectorAll('.btn-toggle-status').forEach(button => {
                button.addEventListener('click', async function () {
                    const productId = this.getAttribute('data-id');
                    const currentStatus = this.getAttribute('data-status') === 'true';
                    const confirmation = confirm(`Você realmente deseja ${currentStatus ? 'inativar' : 'ativar'} este produto?`);
                    if (confirmation) {
                        await toggleProductStatus(productId, !currentStatus);
                        loadProducts();
                    }
                });
            });

            document.querySelectorAll('.btn-view').forEach(button => {
                button.addEventListener('click', async function () {
                    const productId = this.getAttribute('data-id');
                    await showProductPreview(productId);
                });
            });
        }
    }

    async function toggleProductStatus(productId) {
        try {
            const response = await fetch(`http://localhost:8080/produto/atualizaStatusProduto/${productId}?token=${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                messageElement.textContent = 'Status do produto atualizado com sucesso!';
                messageElement.style.color = 'green';
            } else {
                messageElement.textContent = 'Erro ao atualizar status do produto';
                messageElement.style.color = 'red';
            }
        } catch (error) {
            messageElement.textContent = 'Erro ao atualizar status do produto';
            messageElement.style.color = 'red';
        }
    }

    async function showProductPreview(productId) {
        try {
            const response = await fetch(`http://localhost:8080/produto/listaProduto/${productId}`);
            if (response.ok) {
                const product = await response.json();
                modalContent.innerHTML = `
                    <div class="carousel">
                        ${product.imagesPath.map((image, index) => `<img src="${image}" alt="${product.nome}" class="${index === 0 ? 'active' : ''}" />`).join('')}
                        <a class="prev">&#10094;</a>
                        <a class="next">&#10095;</a>
                    </div>
                    <div class="product-details">
                        <h1>${product.nome}</h1>
                        <p>Preço: R$ ${product.preco}</p>
                        <p>Avaliação: <img src="/assets/icons/star.svg" alt="Estrela" /> ${product.avaliacao}</p>
                        <p>Quantidade disponível: ${product.qtdEstoque}</p>
                        <button class="btn btn-buy">Comprar</button>
                        <h2>Descrição</h2>
                        <p>${product.descricao}</p>
                    </div>
                `;
                modal.style.display = 'block';
                initializeCarousel();
            } else {
                messageElement.textContent = 'Erro ao carregar detalhes do produto';
                messageElement.style.color = 'red';
            }
        } catch (error) {
            messageElement.textContent = 'Erro ao carregar detalhes do produto';
            messageElement.style.color = 'red';
        }
    }

    function initializeCarousel() {
        let slideIndex = 0;
        const slides = document.querySelectorAll('.carousel img');
        const prev = document.querySelector('.carousel .prev');
        const next = document.querySelector('.carousel .next');

        function showSlides(n) {
            slides.forEach((slide, index) => {
                slide.style.display = 'none';
                if (index === n) {
                    slide.style.display = 'block';
                }
            });
        }

        function nextSlide() {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlides(slideIndex);
        }

        function prevSlide() {
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            showSlides(slideIndex);
        }

        prev.addEventListener('click', prevSlide);
        next.addEventListener('click', nextSlide);

        showSlides(slideIndex);
    }

    async function loadProducts() {
        const nomeFiltro = searchInput.value;
        const products = await fetchProducts(nomeFiltro);
        renderProductList(products.produtos);
    }

    searchInput.addEventListener('input', () => {
        loadProducts();
    });

    loadProducts();
});