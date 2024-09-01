import { createUserRow } from './userRow.js';
import { filterUsers } from './filterUsers.js';

const users = [
    { name: 'teste1', email: 'teste1@gmail.com', status: 'Ativo', group: 'Administrador' },
    { name: 'teste2', email: 'teste2@gmail.com', status: 'Ativo', group: 'Administrador' },
    { name: 'teste3', email: 'teste3@gmail.com', status: 'Ativo', group: 'Administrador' },
    { name: 'Guilherme', email: 'guilherme@gmail.com', status: 'Ativo', group: 'Administrador' },
];

function renderUserList(users) {
    const userListTable = document.querySelector('#user-list');
    userListTable.innerHTML = '';

    users.forEach(user => {
        const row = createUserRow(user);
        userListTable.appendChild(row);
    });
}

renderUserList(users);

document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value;
    const filteredUsers = filterUsers(users, query);
    renderUserList(filteredUsers); 
});
