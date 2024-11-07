import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/Global/Container';
import { ClientForm } from '../../components/Forms/ClientForm';
import { AddressForm } from '../../components/Forms/ClientAddresForm';
import { GenericButton } from '../../components/Buttons/GenericButton';
import { incluiCliente } from '../../services/api/clientAPI';

export const RegisterClient = () => {
    const [cliente, setCliente] = useState(null);
    const [enderecoFaturamento, setEnderecoFaturamento] = useState(null);
    const [enderecosEntrega, setEnderecosEntrega] = useState([]);
    const [fase, setFase] = useState(1);
    const [enderecoPrincipalIndex, setEnderecoPrincipalIndex] = useState(null);
    const navigate = useNavigate();

    const handleClientSubmit = (clienteData) => {
        setCliente(clienteData);
        setFase(2);
    };

    const handleAddressSubmit = (enderecoData) => {
        const enderecoFaturamentoData = { ...enderecoData, enderecoFaturamento: true };
        setEnderecoFaturamento(enderecoFaturamentoData);
        setFase(3);
    };

    const handleSameAddress = () => {
        const enderecoEntregaData = { ...enderecoFaturamento, principal: true, enderecoFaturamento: false };
        setEnderecosEntrega([enderecoEntregaData]);
        setFase(5);
    };

    const handleDifferentAddressSubmit = (enderecoData) => {
        const enderecoEntregaData = { ...enderecoData, principal: true, enderecoFaturamento: false };
        setEnderecosEntrega((prevEnderecos) => [...prevEnderecos, enderecoEntregaData]);
        setFase(5);
    };

    const handleAddAnotherAddress = () => {
        setFase(4);
    };

    const handleConfirmAddresses = async () => {
        if (enderecoPrincipalIndex === null) {
            alert('Por favor, selecione um endereço principal.');
            return;
        }

        const enderecosAtualizados = enderecosEntrega.map((endereco, index) => ({
            ...endereco,
            principal: index === enderecoPrincipalIndex,
        }));

        const clienteComEnderecos = {
            ...cliente,
            enderecos: [enderecoFaturamento, ...enderecosAtualizados]
        };

        try {
            await incluiCliente(clienteComEnderecos);
            alert('Cliente e endereços cadastrados com sucesso!');
            navigate('/login');
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            alert('Erro ao cadastrar cliente!');
        }
    };

    return (
        <Container>
            {fase === 1 && (
                <>
                   
                    <ClientForm onNext={handleClientSubmit} />
                </>
            )}
            {fase === 2 && (
                <>  
                    <AddressForm onSubmit={handleAddressSubmit} isAddressBilling={true} />
                </>
            )}
            {fase === 3 && (
                <div style={{ margin: '5rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h1 style={{ textAlign: 'center' }}>Os endereços de faturamento e entrega são iguais?</h1>
                    <GenericButton onClick={handleSameAddress} style={{ alignSelf: 'center' }}>
                        Sim
                    </GenericButton>
                    <GenericButton onClick={() => setFase(4)} style={{ alignSelf: 'center' }}>
                        Não
                    </GenericButton>
                </div>
            )}
            {fase === 4 && (
                <>
                    <AddressForm onSubmit={handleDifferentAddressSubmit} isAddressBilling={false} />
                </>
            )}
            {fase === 5 && (
                <div style={{ margin: '5rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h1 style={{ textAlign: 'center' }}>
                        Endereços de Entrega</h1>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {enderecosEntrega.map((endereco, index) => (
                            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem' }}>
                                <input
                                    type="checkbox"
                                    checked={enderecoPrincipalIndex === index}
                                    onChange={() => setEnderecoPrincipalIndex(index)}
                                />
                                {endereco.logradouro}, {endereco.numero}, {endereco.bairro}, {endereco.cidade} - {endereco.uf}
                            </li>
                        ))}
                    </ul>
                    <GenericButton onClick={handleAddAnotherAddress}>Adicionar outro endereço</GenericButton>
                    <GenericButton onClick={handleConfirmAddresses}>Confirmar endereços</GenericButton>
                </div>
            )}
        </Container>
    );
};