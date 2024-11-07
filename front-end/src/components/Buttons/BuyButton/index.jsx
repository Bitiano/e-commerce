import { Button } from './styles';
import PropTypes from 'prop-types';

export const BuyButton = ({ onClick, disabled }) => {

    return (
        <Button onClick={onClick} disabled={disabled}>
            Comprar
        </Button>
    );
};


BuyButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};