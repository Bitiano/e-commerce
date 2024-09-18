export const createProductForm = () => {
    const form = document.createElement("form");
    form.id = "product-form";
    form.enctype = "multipart/form-data";

    form.innerHTML = `
        <div>
            <label for="nome">Nome do Produto:</label>
            <input type="text" id="nome" name="nome" required />
        </div>
        
        <div>
            <label for="avaliacao">Avaliação:</label>
            <input type="number" id="avaliacao" name="avaliacao" step="0.1" required />
        </div>
        
        <div>
            <label for="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" required></textarea>
        </div>
        
        <div>
            <label for="preco">Preço:</label>
            <input type="number" id="preco" name="preco" step="0.01" required />
        </div>
        
        <div>
            <label for="qtdEstoque">Quantidade em Estoque:</label>
            <input type="number" id="qtdEstoque" name="qtdEstoque" required />
        </div>
        
        <div>
            <label for="images">Imagens do Produto:</label>
            <input type="file" id="images" name="images" multiple required />
        </div>
        
        <div>
            <label for="status">Status:</label>
            <select id="status" name="status" required>
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
            </select>
        </div>
        
        <button type="submit">Cadastrar Produto</button>
    `;

    return form;
}