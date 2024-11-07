import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { buscaEnderecosPorCliente, atualizaEnderecoPrincipal } from '../../../services/api/addressAPI';
import { List } from './styles.jsx'

export const ClientAddressList = ({ token, onAddressesChange }) => {
    const [enderecos, setEnderecos] = useState([]);
    const [principalId, setPrincipalId] = useState(null);

    useEffect(() => {
        const fetchEnderecos = async () => {
            const enderecos = await buscaEnderecosPorCliente(token);
            const enderecosEntrega = enderecos.filter(endereco => !endereco.enderecoFaturamento);
            setEnderecos(enderecosEntrega);
            const principal = enderecosEntrega.find(endereco => endereco.principal);
            if (principal) {
                setPrincipalId(principal.id);
            }
            if (onAddressesChange) {
                onAddressesChange(enderecosEntrega);
            }
        };

        fetchEnderecos();
    }, [token, onAddressesChange]);

    const handlePrincipalChange = async (id) => {
        await atualizaEnderecoPrincipal(id, token);
        setPrincipalId(id);
    };

    return (
        <List>
            {enderecos.map((endereco) => (
                <li key={endereco.id}>
                    <input
                        type="checkbox"
                        checked={principalId === endereco.id}
                        onChange={() => handlePrincipalChange(endereco.id)}
                    />
                    {endereco.logradouro}, {endereco.numero}, {endereco.bairro}, {endereco.cidade} - {endereco.uf}
                </li>
            ))}
        </List>
    );
};

ClientAddressList.propTypes = {
    token: PropTypes.string.isRequired,
    onAddressesChange: PropTypes.func,
};