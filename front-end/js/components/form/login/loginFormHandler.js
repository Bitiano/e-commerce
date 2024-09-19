document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:8080/usuario/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha: password })
    });

    const messageElement = document.getElementById('message');

    if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);

        const userInfoResponse = await fetch(`http://localhost:8080/usuario/informacoes?jwtToken=${token}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (userInfoResponse.ok) {
            const user = await userInfoResponse.json();
            localStorage.setItem('userType', user.grupo);
        } else {
            messageElement.textContent = 'Erro ao buscar informações do usuário';
            messageElement.style.color = 'red';
            return;
        }

        messageElement.textContent = 'Login bem-sucedido!';
        messageElement.style.color = 'green';
        window.location.href = './pages/backoffice.html';
    } else {
        messageElement.textContent = `Usuario ou senha inválidos!`;
        messageElement.style.color = 'red';
    }
});
