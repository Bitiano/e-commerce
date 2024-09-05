export function createUserEditForm(user) {
    const form = document.createElement('form');
    form.id = 'user-edit-form';

    form.innerHTML = `
        <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" value="${user.nome}" required >
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="${user.email}" disabled >
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
            <select id="group" name="group" required>
                <option value="ADMIN" ${user.grupo === 'ADMIN' ? 'selected' : ''}> Administrador</option>
                <option value="ESTOQUISTA" ${user.grupo === 'ESTOQUISTA' ? 'selected' : ''}>Estoquista</option>
            </select>
        </div>
        <button type="submit">Salvar </button>
    `;

    return form;
}
