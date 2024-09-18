document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search');

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
                document.getElementById('message').textContent = `Erro ao buscar produtos`;
                document.getElementById('message').style.color = 'red';
                document.getElementById('message').style.marginBottom = '10px';
                return [];
            }
        } catch (error) {
            document.getElementById('message').textContent = `Erro ao buscar produtos`;
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').style.marginBottom = '10px';
            return [];
        }
    }

    function renderProductList(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            console.log(product);
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
                <td>${product.code}</td>
                <td>${product.nome}</td>
                <td>${product.qtdEstoque}</td>
                <td>R$${product.preco}</td>
                <td>${product.status ? 'Ativo' : 'Inativo'}</td>
                <td>
                    <button class="btn btn-edit" onclick="editProduct(${product.id})">Editar</button>
                    <button class="btn btn-view" onclick="viewProduct(${product.id})">Visualizar</button>
                    <button class="btn btn-toggle-status" onclick="toggleProductStatus(${product.id})">${product.status ? 'Desativar' : 'Ativar'}</button>
                </td>
            `;
            productList.appendChild(productRow);
        });
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

function editProduct(productId) {
    window.location.href = `edit-product.html?id=${productId}`;
}