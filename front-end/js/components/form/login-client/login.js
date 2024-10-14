document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const clienteLoginDto = {
            email: formData.get('email'),
            senha: formData.get('senha')
        };

        const response = await fetch('http://localhost:8080/cliente/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteLoginDto)
        });

        if (response.ok) {
            const token = await response.text();
            localStorage.setItem('token', token);
            alert('Login realizado com sucesso!');
            window.location.href = 'edit-client.html';
        } else {
            alert('Erro ao realizar login! Verifique suas credenciais.');
        }
    });
});