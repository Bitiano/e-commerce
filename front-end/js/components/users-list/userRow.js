import { toggleUserStatus } from './userStatusHandler.js';

export function createUserRow(user) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.status}</td>
        <td>${user.group}</td>
        <td>
            <button onclick="editUser('${user.email}')">Editar</button>
            <button onclick="toggleUserStatus('${user.email}', '${user.status}')">
                ${user.status === 'Ativo' ? 'Inativar' : 'Ativar'}
            </button>
        </td>
    `;

    row.querySelector('button:nth-child(2)').addEventListener('click', () => {
        toggleUserStatus(user.email, user.status);
    });

    return row;
}
