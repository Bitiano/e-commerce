import PropTypes from 'prop-types';
import { Container, List } from './styles.jsx';

export const AddressSelection = ({ enderecos, onEnderecoSelect, onAddAddress }) => {
    return (
        <Container>
            <h2>Escolha o Endereço de Entrega</h2>
            <List>
                {enderecos.map((endereco) => (
                    <li key={endereco.id}>
                        <input
                            type="radio"
                            id={endereco.id}
                            name="endereco"
                            onChange={() => onEnderecoSelect(endereco)}
                        />
                        <label htmlFor={endereco.id}>
                            {endereco.logradouro}, {endereco.numero}, {endereco.bairro}, {endereco.cidade} - {endereco.uf}
                        </label>
                    </li>
                ))}
            </List>
            <button onClick={onAddAddress}>Adicionar Novo Endereço</button>
        </Container>
    );
};

AddressSelection.propTypes = {
    enderecos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEnderecoSelect: PropTypes.func.isRequired,
    onAddAddress: PropTypes.func.isRequired,
};