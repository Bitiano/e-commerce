import { toggleUserStatus } from './userStatusHandler.js';

export function createUserRow(user) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${user.nome}</td>
        <td>${user.email}</td>
        <td>${user.ativo ? 'Ativo' : 'Inativo'}</td>
        <td>${user.grupo}</td>
        <td>
            <button onclick="editUser(${user.id})">Editar</button>
            <button onclick="toggleUserStatus(${user.id})">${user.ativo ? 'Desativar' : 'Ativar'}</button>
        </td>
    `;

    row.querySelector('button:nth-child(2)').addEventListener('click', () => {
        toggleUserStatus(user.email, user.status);
    });

    return row;
}

window.editUser = function editUser(userId) {
    window.location.href = `./edit-user.html?id=${userId}`;
}