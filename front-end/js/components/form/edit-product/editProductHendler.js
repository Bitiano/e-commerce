import { createEditForm } from './editProduct.js';

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('#form-container');
    const form = createEditForm();
    container.appendChild(form);
    const messageElement = document.querySelector('#message');

    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    async function fetchProductDetails() {
        try {
            const response = await fetch(`http://localhost:8080/produto/listaProduto/${productId}`);
            if (response.ok) {
                const product = await response.json();
                populateForm(product);
            } else {
                messageElement.textContent = 'Erro ao carregar detalhes do produto';
                messageElement.style.color = 'red';
            }
        } catch (error) {
            messageElement.textContent = 'Erro ao carregar detalhes do produto';
            messageElement.style.color = 'red';
        }
    }

    function populateForm(product) {
        document.getElementById('nome').value = product.nome;
        document.getElementById('avaliacao').value = product.avaliacao;
        document.getElementById('descricao').value = product.descricao;
        document.getElementById('preco').value = product.preco;
        document.getElementById('qtdEstoque').value = product.qtdEstoque;
        document.getElementById('status').value = product.status;
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(`http://localhost:8080/produto/atualizaProduto/${productId}?token=${token}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                messageElement.textContent = 'Produto atualizado com sucesso!';
                messageElement.style.color = 'green';
            } else {
                messageElement.textContent = 'Erro ao atualizar produto';
                messageElement.style.color = 'red';
            }
        } catch (error) {
            messageElement.textContent = 'Erro ao atualizar produto';
            messageElement.style.color = 'red';
        }
    });

    fetchProductDetails();
});