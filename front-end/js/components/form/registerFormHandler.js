import { createUserForm } from './registerForm.js';

document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const userForm = createUserForm();

    formContainer.appendChild(userForm);

    userForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const name = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const group = document.getElementById('group').value;

        if (password !== confirmPassword) {
            alert('As senhas não são iguais. Tente novamente');
            return;
        }

        const newUser = { name, cpf, email, password, group };
        console.log('Usuário ', newUser);

        alert('Usuário cadastrado com sucesso');
        userForm.reset(); 
    });
});
