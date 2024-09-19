export const createEditForm = (userType) => {
    const form = document.createElement('form');
    form.id = 'edit-product-form';

    form.innerHTML = `
        <div>
            <label for="nome">Nome do Produto:</label>
            <input type="text" id="nome" name="nome" required ${userType === 'ESTOQUISTA' ? 'disabled' : ''} />
        </div>

        <div>
            <label for="avaliacao">Avaliação:</label>
            <input type="number" id="avaliacao" name="avaliacao" step="0.1" required ${userType === 'ESTOQUISTA' ? 'disabled' : ''} />
        </div>

        <div>
            <label for="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" maxlength="255" required ${userType === 'ESTOQUISTA' ? 'disabled' : ''}></textarea>
            <div id="descricao-count">0/255</div>
        </div>

        <div>
            <label for="preco">Preço:</label>
            <input type="number" id="preco" name="preco" step="0.01" required ${userType === 'ESTOQUISTA' ? 'disabled' : ''} />
        </div>

        <div>
            <label for="qtdEstoque">Quantidade em Estoque:</label>
            <input type="number" id="qtdEstoque" name="qtdEstoque" required />
        </div>

        <div ${userType === 'ESTOQUISTA' ? 'style="display:none;"' : ''}>
            <label for="images">Imagens do Produto:</label>
            <input type="file" id="images" name="images" multiple />
        </div>

        <div ${userType === 'ESTOQUISTA' ? 'style="display:none;"' : ''}>
            <label for="status">Status:</label>
            <select id="status" name="status" required>
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
            </select>
        </div>

        <button type="submit">Atualizar Produto</button>
    `;

    return form;
};