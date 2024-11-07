import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { buscaCep } from '../../../services/api/cepAPI';
import { InputContainer } from './styles';

export const SearchCepInput = ({ onCepChange, initialCep }) => {
    const [cep, setCep] = useState(initialCep || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialCep) {
            setCep(initialCep);
            handleCepSubmit(initialCep);
        }
    }, [initialCep]);

    const handleCepChange = (e) => {
        setCep(e.target.value);
    };

    const handleCepSubmit = async (cepValue) => {
        setError('');
        try {
            const data = await buscaCep(cepValue || cep);
            onCepChange(data);
        } catch (err) {
            setError('Erro ao buscar o CEP. Verifique se o CEP está correto.');
            console.error(err);
        }
    };

    return (
        <InputContainer>
            <form onSubmit={(e) => { e.preventDefault(); handleCepSubmit(); }}>
                <div>
                    <label htmlFor="cep">Digite seu CEP:</label>
                    <input
                        type="text"
                        id="cep"
                        value={cep}
                        onChange={handleCepChange}
                        required
                    />
                </div>
                <button type="submit">Buscar CEP</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </InputContainer>
    );
};

SearchCepInput.propTypes = {
    onCepChange: PropTypes.func.isRequired,
    initialCep: PropTypes.string,
};