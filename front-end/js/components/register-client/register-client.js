document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const cepInput = document.getElementById('cep');
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('uf');

    cepInput.addEventListener('blur', async () => {
        const cep = cepInput.value;
        if (cep.length === 8) {
            const endereco = await buscaEnderecoPorCep(cep);
            console
            if (endereco) {
                logradouroInput.value = endereco.logradouro;
                bairroInput.value = endereco.bairro;
                cidadeInput.value = endereco.localidade;
                estadoInput.value = endereco.uf;
            } else {
                alert('CEP inválido!');
            }
        }
    });

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const cliente = {
            nomeCompleto: formData.get('nomeCompleto'),
            dataNascimento: formData.get('dataNascimento'),
            genero: formData.get('genero'),
            email: formData.get('email'),
            cpf: formData.get('cpf'),
            senha: formData.get('senha'),
            enderecos: [{
                cep: formData.get('cep'),
                logradouro: formData.get('logradouro'),
                numero: formData.get('numero'),
                bairro: formData.get('bairro'),
                cidade: formData.get('cidade'),
                uf: formData.get('uf'),
                enderecoFaturamento: true,
                ativo: true, 
                principal: true 
            }]
        };

        const cepValido = await validaCep(cliente.enderecos[0].cep);
        if (!cepValido) {
            alert('CEP inválido!');
            return;
        }

        const response = await fetch('http://localhost:8080/cliente/incluiCliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        if (response.ok) {
            alert('Cliente cadastrado com sucesso!');
            window.location.href = 'login-client.html';
        } else {
            alert('Erro ao cadastrar cliente!');
        }
    });

    async function buscaEnderecoPorCep(cep) {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.ok) {
            const data = await response.json();
            if (!data.erro) {
                return data;
            }
        }
        return null;
    }

    async function validaCep(cep) {
        const endereco = await buscaEnderecoPorCep(cep);
        return endereco !== null;
    }
});