function createLoginForm() {
    const form = document.createElement('form');
    form.id = 'login-form';
    form.innerHTML = `
        <input type="text" id="email" name="email" placeholder="Digite seu email..." reqired/>
        <input type="password" id="password" name="password" placeholder="Digite sua senha..." reqired/>
        <button type="submit">Entrar</button>
    `;
    return form;
}

const formLogin = createLoginForm();
document.querySelector('.container-login-form').appendChild(formLogin);