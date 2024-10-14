document.addEventListener('DOMContentLoaded', async () => {
    const updateForm = document.getElementById('update-form');
    const addAddressForm = document.getElementById('add-address-form');
    const addressList = document.getElementById('address-list');
    const emailInput = document.getElementById('email');

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
        console.log(enderecos);
        addressList.innerHTML = ''; // Limpar a lista antes de renderizar
        enderecos.forEach(endereco => {
            console.log(endereco);
            const li = document.createElement('li');
            li.textContent = `${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}`;
            li.style.margin = '10px 0';
            li.style.padding = '10px';
            li.style.border = '1px solid #ccc';
            li.style.borderRadius = '5px';
            li.style.width = 'fit-content';
            const button = document.createElement('button');
            button.textContent = 'Definir como Padrão';
            button.style.marginLeft = '15px';
            button.addEventListener('click', async () => {
                const response = await fetch(`http://localhost:8080/endereco/atualizaPrincipal/idEndereco/${endereco.id}/token/${token}`, {
                    method: 'PUT'
                });
                if (response.ok) {
                    alert('Endereço definido como padrão com sucesso!');
                    window.location.reload();
                } else {
                    alert('Erro ao definir endereço como padrão!');
                }
            });
            li.appendChild(button);
            addressList.appendChild(li);
        });
    } else {
        alert('Erro ao buscar endereços do cliente!');
    }

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
            enderecoFaturamento: false,
            ativo: true,
            principal: false
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