export function createUserEditForm(user) {
    const form = document.createElement('form');
    form.id = 'user-edit-form';

    form.innerHTML = `
        <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" value="${user.name}" required >
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="${user.email}" required disabled>
        </div>

        <div class="form-group">
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" value="${user.cpf}" required >
        </div>

        <div class="form-group">
            <label for="password">Nova Senha:</label>
            <input type="password" id="password" name="password" placeholder="Digite sua nova senha...">
        </div>

        <div class="form-group">
            <label for="confirmPassword">Confirma Nova Senha:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirme sua nova senha...">
        </div>

        <div class="form-group">
            <label for="group">Grupo:</label>
            <select id="group" name="group">
                <option value="administrador" ${user.group === 'administrador' ? 'selected' : ''}>Administrador</option>
                <option value="estoquista" ${user.group === 'estoquista' ? 'selected' : ''}>Estoquista</option>
            </select>
        </div>
        <button type="submit">Salvar </button>
    `;

    return form;
}
