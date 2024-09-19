import { createEditForm } from './editProduct.js';

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('#form-container');
    const userType = localStorage.getItem('userType');
    const form = createEditForm(userType);
    container.appendChild(form);
    const messageElement = document.querySelector('#message');

    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    let existingImages = [];

    async function fetchProductDetails() {
        try {
            const response = await fetch(`http://localhost:8080/produto/listaProduto/${productId}`);
            if (response.ok) {
                const product = await response.json();
                populateForm(product);
                existingImages = product.imagesPath || [];
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
        if (document.getElementById('status')) {
            document.getElementById('status').value = product.status ? 'true' : 'false';
        }
        updateDescricaoCount();
    }

    const imageUrls = [];

    const handleUpload = async (image) => {
        if (image) {
            const formData = new FormData();
            formData.append('key', 'e25e2067a76ad68fa848bfc08aa579dc');
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
                    messageElement.textContent = 'Erro ao fazer upload da imagem';
                    console.error('Erro ao fazer upload da imagem');
                }
            } catch (error) {
                messageElement.textContent = 'Erro ao fazer upload da imagem';
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

    const descricaoInput = document.getElementById('descricao');
    const descricaoCount = document.getElementById('descricao-count');

    const updateDescricaoCount = () => {
        const currentLength = descricaoInput.value.length;
        descricaoCount.textContent = `${currentLength}/255`;
    };

    descricaoInput.addEventListener('input', updateDescricaoCount);

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const userType = localStorage.getItem('userType');

        const productData = {
            nome: userType !== 'ESTOQUISTA' ? formData.get('nome').trim() : undefined,
            avaliacao: userType !== 'ESTOQUISTA' ? parseFloat(formData.get('avaliacao')) : undefined,
            descricao: userType !== 'ESTOQUISTA' ? formData.get('descricao').trim() : undefined,
            preco: userType !== 'ESTOQUISTA' ? parseFloat(formData.get('preco')) : undefined,
            qtdEstoque: parseInt(formData.get('qtdEstoque')),
            imagesPath: userType !== 'ESTOQUISTA' ? (imageUrls.length > 0 ? imageUrls : existingImages) : undefined,
            status: userType !== 'ESTOQUISTA' ? formData.get('status') === 'true' : undefined
        };

        Object.keys(productData).forEach(key => {
            if (productData[key] === undefined) {
                delete productData[key];
            }
        });

        try {
            const response = await fetch(`http://localhost:8080/produto/atualizaProduto/${productId}?token=${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                messageElement.textContent = 'Produto atualizado com sucesso!';
                messageElement.style.color = 'green';
                form.reset();
            } else {
                messageElement.textContent = 'Erro ao atualizar produto';
                messageElement.style.color = 'red';
            }
        } catch (error) {
            messageElement.textContent = 'Erro ao atualizar produto';
            messageElement.style.color = 'red';
        }
    });

    document.getElementById('images').addEventListener('change', handleImageChange);
    fetchProductDetails();
});