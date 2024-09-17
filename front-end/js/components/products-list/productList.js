document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('search');
    const productTableBody = document.querySelector('#productTable tbody');

    async function fetchProducts(query = '') {
        try {
            const response = await fetch(`http://localhost:8080/produto/buscaProdutos/?nomeFiltro=${query}`);
            const produtos = await response.json();

            productTableBody.innerHTML = '';

            produtos.produtos.forEach(produto => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.quantidade}</td>
                    <td>${produto.preco}</td>
                    <td>${produto.ativo ? 'Ativo' : 'Inativo'}</td>
                    <td>
                        <button onclick="alterarProduto(${produto.id})">Alterar</button>
                        <button onclick="inativarProduto(${produto.id})">Inativar</button>
                        <button onclick="visualizarProduto(${produto.id})">Visualizar</button>
                    </td>
                `;

                productTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    searchInput.addEventListener('input', function() {
        const query = searchInput.value;
        fetchProducts(query);
    });

    fetchProducts();
});

function editarProduto(id) {
   
}

function inativarProduto(id) {
}    

function visualizarProduto(id) {
    // const modal = document.getElementById('modal');
    // const modalContent = document.getElementById('modalContent');

    // modalContent.innerHTML = `
    //     <h2>Produto ${id}</h2>
    //     <p>Descrição do produto ${id}</p>
    // `;

    // modal.style.display = 'block';
}
