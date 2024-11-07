import PropTypes from 'prop-types';
import { useContext } from 'react';
import { List } from './styles';
import { CartContext } from '../../../contexts/CartContext';

export const FreightOptionsList = ({ onFreightChange }) => {
    const { setFreightOption } = useContext(CartContext);

    const freightOptions = [
        { id: 'frete-gratis', label: 'SEDEX', price: 0.00 },
        { id: 'frete-rapido', label: 'PAC', price: 10.00 },
        { id: 'frete-expresso', label: 'MINIENVIOS', price: 20.00 },
    ];

    const handleFreightSelect = (option) => {
        setFreightOption(option);
        onFreightChange(option);
    };

    return (
        <List>
            {freightOptions.map((option) => (
                <li key={option.id}>
                    <input
                        type="radio"
                        id={option.id}
                        name="freight"
                        onChange={() => handleFreightSelect(option)}
                    />
                    <label htmlFor={option.id}>{option.label}: </label>
                    <span>R$ {option.price.toFixed(2)}</span>
                </li>
            ))}
        </List>
    );
};

FreightOptionsList.propTypes = {
    onFreightChange: PropTypes.func.isRequired,
};