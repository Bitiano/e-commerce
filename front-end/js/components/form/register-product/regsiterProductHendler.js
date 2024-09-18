import { createProductForm } from './registerProduct.js';

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('#form-container');
  const form = createProductForm();
  container.appendChild(form);

  const messageElement = document.createElement('div');
  messageElement.id = 'message';
  container.appendChild(messageElement);

  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(`http://localhost:8080/produto/incluiProduto?token=${token}`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        messageElement.textContent = 'Produto cadastrado com sucesso!';
        messageElement.style.color = 'green';
        form.reset();
      } else {
        messageElement.textContent = 'Erro ao cadastrar produto';
        messageElement.style.color = 'red';
      }
    } catch (error) {
      messageElement.textContent = 'Erro ao cadastrar produto';
      messageElement.style.color = 'red';
    }
  });
});
