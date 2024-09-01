export function createUserForm() {
    const form = document.createElement('form');
    form.id = 'user-form';

    form.innerHTML = `
        <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" placeholder="Digite seu nome..." required>
        </div>

        <div class="form-group">
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" placeholder="Digite seu CPF..." required>
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Digite seu email..." required>
        </div>

        <div class="form-group">
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" placeholder="Digite sua senha..." required>
        </div>

        <div class="form-group">
            <label for="confirmPassword">Confirmar senha:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirme sua senha..." required>
        </div>

        <div class="form-group">
            <label for="group">Grupo:</label>
            <select id="group" name="group" required>
                <option value="Administrador">Administrador</option>
                <option value="Estoquista">Estoquista</option>
            </select>
        </div>
        <button type="submit">Cadastrar</button>
    `;

    return form;
}
