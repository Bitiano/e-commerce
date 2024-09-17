export const createEditForm = () => {
    const form = document.createElement('form');
    form.id = 'edit-product-form';
    
    form.innerHTML = `
        <div>
            <label for="nome">Nome do Produto:</label>
            <input type="text" id="nome" name="nome"  required />
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
            <input type="number" id="qtdEstoque" name="qtdEstoque"  required />
        </div>

        <div>
            <label for="status">Status:</label>
            <select id="status" name="status">
                <option >Ativo</option>
                <option >Inativo</option>
            </select>
        </div>

        <div>
            <label for="images">Imagens:</label>
            <input type="file" id="images" name="images" multiple />
        </div>

        <button type="submit">Editar Produto</button>
        
    `;
    
    return form;
};
