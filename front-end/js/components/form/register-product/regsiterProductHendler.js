import { createProductForm } from "./registerProduct.js";

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("form-container");
  const productForm = createProductForm();

  formContainer.appendChild(productForm);

  productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nome", document.getElementById("nome").value);
    formData.append("avaliacao", document.getElementById("avaliacao").value);
    formData.append("descricao", document.getElementById("descricao").value);
    formData.append("preco", document.getElementById("preco").value);
    formData.append("qtdEstoque", document.getElementById("qtdEstoque").value);
    formData.append("status", document.getElementById("status").value);

    const images = document.getElementById("images").files;
    for (let i = 0; i < images.length; i++) {
      formData.append("imagesPath", images[i]);
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/produto/incluiProduto?token=${token}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Produto cadastrado com sucesso");
        productForm.reset();
        window.location.href = "./products-list.html";
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar produto: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Erro ao cadastrar produto: ${error.message}`);
    }
  });
});
