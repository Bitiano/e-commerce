import { createEditForm } from "./editProduct.js";

const editForm = createEditForm();
const formContainer = document.getElementById("form-container");

formContainer.appendChild(editForm);

// document.addEventListener("DOMContentLoaded", () => {
//     const formContainer = document.getElementById("form-container");
//     const product = JSON.parse(localStorage.getItem("product"));
//     const editForm = createEditForm(product);
    
//     formContainer.appendChild(editForm);
    
//     editForm.addEventListener("submit", async (event) => {
//         event.preventDefault();
    
//         const formData = new FormData();
//         formData.append("nome", document.getElementById("nome").value);
//         formData.append("avaliacao", document.getElementById("avaliacao").value);
//         formData.append("descricao", document.getElementById("descricao").value);
//         formData.append("preco", document.getElementById("preco").value);
//         formData.append("qtdEstoque", document.getElementById("qtdEstoque").value);
//         formData.append("status", document.getElementById("status").value);
    
//         const images = document.getElementById("images").files;
//         for (let i = 0; i < images.length; i++) {
//         formData.append("imagesPath", images[i]);
//         }
    
//         const token = localStorage.getItem("token");
    
//         try {
//         const response = await fetch(
//             `http://localhost:8080/produto/atualizaProduto?idProduto=${product.id}&token=${token}`,
//             {
//             method: "PUT",
//             body: formData,
//             }
//         );
    
//         if (response.ok) {
//             alert("Produto atualizado com sucesso");
//             window.location.href = "./products-list.html";
//         } else {
//             const errorData = await response.json();
//             alert(`Erro ao atualizar produto: ${errorData.message}`);
//         }
//         } catch (error) {
//         alert(`Erro ao atualizar produto: ${error.message}`);
//         }
//     });
// });