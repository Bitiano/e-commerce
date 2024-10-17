document.addEventListener('DOMContentLoaded', async () => {
    const updateForm = document.getElementById('update-form');
    const addAddressForm = document.getElementById('add-address-form');
    const addressList = document.getElementById('address-list');
    const emailInput = document.getElementById('email');
    const cepInput = document.getElementById('cep');
    const logradouroInput = document.getElementById('logradouro');
    const numeroInput = document.getElementById('numero');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const ufInput = document.getElementById('uf');

    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/cliente/buscaClienteByToken/token/${token}`);
    if (response.ok) {
        const cliente = await response.json();
        emailInput.value = cliente.email;
        document.getElementById('nomeCompleto').value = cliente.nomeCompleto;
        document.getElementById('dataNascimento').value = cliente.dataNascimento;
        document.getElementById('genero').value = cliente.genero;
    } else {
        alert('Erro ao buscar informações do cliente!');
    }

    const addressResponse = await fetch(`http://localhost:8080/endereco/buscaEnderecosPorCliente/token/${token}`);
    if (addressResponse.ok) {
        const enderecos = await addressResponse.json();
        addressList.innerHTML = ''; 
        enderecos.forEach(endereco => {
            const li = document.createElement('li');
            li.textContent = `${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}`;
            li.style.margin='1rem auto';
            li.style.padding='.7rem 0';
            li.style.border='1px solid #ccc';
            li.style.borderRadius='5px';
            li.style.maxWidth='650px';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = endereco.principal;
            checkbox.style.marginLeft = '15px';
            checkbox.addEventListener('change', async () => {
                if (checkbox.checked) {
                    const response = await fetch(`http://localhost:8080/endereco/atualizaPrincipal/idEndereco/${endereco.id}/token/${token}`, {
                        method: 'PUT'
                    });
                    if (response.ok) {
                        alert('Endereço definido como padrão com sucesso!');
                        window.location.reload();
                    } else {
                        alert('Erro ao definir endereço como padrão!');
                    }
                }
            });

            li.appendChild(checkbox);
            addressList.appendChild(li);
        });
    } else {
        alert('Erro ao buscar endereços do cliente!');
    }

    cepInput.addEventListener('blur', async () => {
        const cep = cepInput.value.replace(/\D/g, '');
        if (cep.length === 8) {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.ok) {
                const data = await response.json();
                if (!data.erro) {
                    logradouroInput.value = data.logradouro;
                    bairroInput.value = data.bairro;
                    cidadeInput.value = data.localidade;
                    ufInput.value = data.uf;
                } else {
                    alert('CEP não encontrado!');
                }
            } else {
                alert('Erro ao buscar CEP!');
            }
        }
    });

    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(updateForm);
        const cliente = {
            nomeCompleto: formData.get('nomeCompleto'),
            dataNascimento: formData.get('dataNascimento'),
            genero: formData.get('genero'),
            senha: formData.get('senha')
        };

        const response = await fetch(`http://localhost:8080/cliente/atualiza/token/${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        if (response.ok) {
            alert('Dados atualizados com sucesso!');
            window.location.href = 'index.html';
        } else {
            alert('Erro ao atualizar dados!');
        }
    });

    addAddressForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(addAddressForm);
        const endereco = {
            cep: formData.get('cep'),
            logradouro: formData.get('logradouro'),
            numero: formData.get('numero'),
            bairro: formData.get('bairro'),
            cidade: formData.get('cidade'),
            uf: formData.get('uf'),
            ativo: true
        };

        const response = await fetch(`http://localhost:8080/endereco/adicionaEndereco/token/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(endereco)
        });

        if (response.ok) {
            alert('Endereço adicionado com sucesso!');
            window.location.reload();
        } else {
            alert('Erro ao adicionar endereço!');
        }
    });
});