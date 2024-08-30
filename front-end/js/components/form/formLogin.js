function createLoginForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" name="email" placeholder="Digite seu email..." reqired/>
        <input type="password" name="password" placeholder="Digite sua senha..." reqired/>
        <button type="submit">Entrar</button>
    `;
    return form;
}

const formLogin = createLoginForm();
document.querySelector('.login-form').appendChild(formLogin);