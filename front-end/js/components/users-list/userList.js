import { createUserRow } from "./userRow.js";
document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../login.html'; 
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/usuario/buscaUsuarios?token=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const users = await response.json();
            renderUserList(users);
        } else {
            const error = await response.text();
            document.getElementById('message').textContent = `Erro: ${error}`;
            document.getElementById('message').style.color = 'red';
        }
    } catch (error) {
        document.getElementById('message').textContent = `Erro: ${error.message}`;
        document.getElementById('message').style.color = 'red';
    }
});

function renderUserList(users) {
    const userListElement = document.getElementById('user-list');
    userListElement.innerHTML = '';

    users.forEach(user => {
        const userRow = createUserRow(user);
        userListElement.appendChild(userRow);
    });
}