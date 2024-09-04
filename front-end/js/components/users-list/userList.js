import { createUserRow } from './userRow.js';

const API_URL = 'http://localhost:8080/usuario'; 

async function fetchUsers(query = '') {
    const token = 'seu-token-aqui';
    try {
        const response = await fetch(`${API_URL}/buscaUsuarios?nomeFiltro=${query}&token=${token}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários: ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

function renderUserList(users) {
    const userListTable = document.querySelector('#user-list');
    userListTable.innerHTML = '';

    users.forEach(user => {
        const row = createUserRow(user);
        userListTable.appendChild(row);
    });
}

document.getElementById('search').addEventListener('input', async (event) => {
    const query = event.target.value;
    const filteredUsers = await fetchUsers(query);
    renderUserList(filteredUsers);
});

fetchUsers().then(renderUserList);