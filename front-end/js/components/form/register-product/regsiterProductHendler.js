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

  const imageUrls = [];

  const handleImageClick = () => {
    const inputElement = document.getElementById('images');
    inputElement.click();
  };

  const handleUpload = async (image) => {
    if (image) {
      const formData = new FormData();
      formData.append('key', '5d7b99eb4e0e934e0de6dbfce6cd0859');
      formData.append('image', image);

      try {
        const response = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.data.url;
          imageUrls.push(imageUrl);
        } else {
          console.error('Erro ao fazer upload da imagem');
        }
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    for (const file of files) {
      handleUpload(file);
    }
  };

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const productData = {
      nome: formData.get('nome').trim(),
      avaliacao: parseFloat(formData.get('avaliacao')),
      descricao: formData.get('descricao').trim(),
      preco: parseFloat(formData.get('preco')),
      qtdEstoque: parseInt(formData.get('qtdEstoque')),
      imagesPath: imageUrls,
      status: true // Ajuste conforme necessário
    };

    try {
      const response = await fetch(`http://localhost:8080/produto/incluiProduto?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
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

  document.getElementById('images').addEventListener('change', handleImageChange);
});