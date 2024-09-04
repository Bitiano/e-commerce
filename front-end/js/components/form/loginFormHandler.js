document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/token/valid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
        localStorage.setItem('token', result.token);

        window.location.href = '/backoffice.html';
    } else {
        document.getElementById('message').textContent = result.message || 'Erro ao fazer login';
    }
});