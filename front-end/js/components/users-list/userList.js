import { createUserRow } from "./userRow.js";

document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../login.html';
        return;
    }

    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');

    async function fetchUsers(nomeFiltro) {
        try {
            const response = await fetch(`http://localhost:8080/usuario/buscaUsuarios?nomeFiltro=${nomeFiltro}&token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const users = await response.json();
                return users;
            } else {
                document.getElementById('message').textContent = `Erro ao buscar usuários`;
                document.getElementById('message').style.color = 'red';
                return [];
            }
        } catch (error) {
            document.getElementById('message').textContent = `Erro ao buscar usuários`;
            document.getElementById('message').style.color = 'red';
            return [];
        }
    }

    function renderUserList(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const userRow = createUserRow(user);
            userList.appendChild(userRow);
        });
    }

    searchInput.addEventListener('input', async (event) => {
        const nomeFiltro = event.target.value;
        const users = await fetchUsers(nomeFiltro);
        renderUserList(users);
    });

    const users = await fetchUsers('');
    renderUserList(users);
});