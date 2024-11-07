import { useState, useEffect, useContext } from 'react';
import { SearchCepInput } from '../../Inputs/SearchCepInput';
import { FreightOptionsList } from '../../Lists/FreightOptionsList';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscaEnderecosPorCliente } from '../../../services/api/addressAPI';
import { Card } from './styles';
import PropTypes from 'prop-types';

export const FreightCard = ({ onFreightChange }) => {
    const { user } = useContext(AuthContext);
    const [location, setLocation] = useState(null);
    const [selectedFreight, setSelectedFreight] = useState(null);

    useEffect(() => {
        const fetchPrincipalAddress = async () => {
            if (user) {
                const token = localStorage.getItem('token');
                const enderecos = await buscaEnderecosPorCliente(token);
                const enderecoPrincipal = enderecos.find(endereco => endereco.principal);
                if (enderecoPrincipal) {
                    setLocation({
                        logradouro: enderecoPrincipal.logradouro,
                        bairro: enderecoPrincipal.bairro,
                        localidade: enderecoPrincipal.cidade,
                        uf: enderecoPrincipal.uf,
                        cep: enderecoPrincipal.cep
                    });
                }
            }
        };

        fetchPrincipalAddress();
    }, [user]);

    const handleCepChange = (data) => {
        setLocation(data);
    };

    const handleFreightChange = (freight) => {
        setSelectedFreight(freight);
        onFreightChange(freight);
    };

    return (
        <Card>
            <SearchCepInput onCepChange={handleCepChange} initialCep={location ? location.cep : ''} />
            {location && (
                <div>
                    <p>Local: <strong>{location.logradouro}, {location.bairro}, {location.localidade} - {location.uf}</strong></p>
                    <FreightOptionsList onFreightChange={handleFreightChange} />
                    {selectedFreight && (
                        <p>Frete Selecionado: {selectedFreight.label} - R$ {selectedFreight.price.toFixed(2)}</p>
                    )}
                </div>
            )}
        </Card>
    );
};

FreightCard.propTypes = {
    onFreightChange: PropTypes.func.isRequired
};