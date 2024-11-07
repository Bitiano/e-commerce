import { Button } from './styles';
import { FaCartPlus } from "react-icons/fa";
import ProtTypes from 'prop-types';

export const AddCartButton = ({ onClick, disabled }) => {
    return (
        <Button onClick={onClick} disabled={disabled}>
            <FaCartPlus />
        </Button>
    );
};

AddCartButton.propTypes = {
    onClick: ProtTypes.func,
    disabled: ProtTypes.bool,
};