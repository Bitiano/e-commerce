import { useState } from 'react';
import PropTypes from 'prop-types';
import { buscaCep } from '../../../services/api/cepAPI';
import { Form } from './styles';

export const AddressForm = ({ onSubmit, isAddressBilling }) => {
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');

    const handleCepChange = async (e) => {
        const cepValue = e.target.value;
        setCep(cepValue);
        if (cepValue.length === 8) {
            try {
                const data = await buscaCep(cepValue);
                setLogradouro(data.logradouro);
                setBairro(data.bairro);
                setCidade(data.localidade);
                setUf(data.uf);
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const endereco = { 
            cep, 
            logradouro, 
            bairro, 
            cidade, 
            uf, 
            numero, 
            complemento, 
            ativo: true, 
            enderecoFaturamento: false 
        };
        onSubmit(endereco);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>{isAddressBilling ? 'Endereço de Faturamento' : 'Endereço de Entrega'}</h2>
            <div>
                <label>CEP:</label>
                <input type="text" value={cep} onChange={handleCepChange} required />
            </div>
            <div>
                <label>Logradouro:</label>
                <input type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} required />
            </div>
            <div>
                <label>Bairro:</label>
                <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
            </div>
            <div>
                <label>Cidade:</label>
                <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
            </div>
            <div>
                <label>Estado:</label>
                <input type="text" value={uf} onChange={(e) => setUf(e.target.value)} required />
            </div>
            <div>
                <label>Número:</label>
                <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} required />
            </div>
            <div>
                <label>Complemento:</label>
                <input type="text" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
            </div>
            <button type="submit">Cadastrar</button>
        </Form>
    );
};

AddressForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isAddressBilling: PropTypes.bool.isRequired
};