import { useState } from 'react';
import { Container } from '../../components/Global/Container';
import { ClientAddressList } from '../../components/Lists/ClientAddressList';
import { AddressForm } from '../../components/Forms/ClientAddresForm';
import { adicionaEndereco, buscaEnderecosPorCliente } from '../../services/api/addressAPI';

export const AddressClientList = () => {
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [enderecos, setEnderecos] = useState([]);
    const token = localStorage.getItem('token');

    const handleAddAddress = async (newAddress) => {
        await adicionaEndereco(token, newAddress);
        const updatedEnderecos = await buscaEnderecosPorCliente(token);
        setEnderecos(updatedEnderecos.filter(endereco => !endereco.enderecoFaturamento));
        setShowAddressForm(false);
    };

    const handleAddressesChange = (updatedEnderecos) => {
        setEnderecos(updatedEnderecos);
    };

    return (
        <Container>
            <h1 style={{
                fontSize: '2rem',
                color: 'var(--primary-color)',
                marginBottom: '1.5rem',
                textAlign: 'center',
            }}>Meus Endereços</h1>

            <ClientAddressList token={token} onAddressesChange={handleAddressesChange} />

            <button
                onClick={() => setShowAddressForm(true)}
                style={{
                    marginTop: '1.5rem',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    color: 'var(--text-color-light)',
                    backgroundColor: 'var(--accent-color)',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                }}
            >
                Adicionar Novo Endereço
            </button>

            {showAddressForm && (
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    border: '1px solid var(--primary-color)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--background-color)',
                }}>
                    <AddressForm onSubmit={handleAddAddress} />
                </div>
            )}
        </Container>
    );
};
