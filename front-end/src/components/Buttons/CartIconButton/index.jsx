import { Icon } from "./styles";
import { FaCartShopping } from "react-icons/fa6";
import PropTypes from 'prop-types';

export const Cart = ({ onClick }) => {
    return (
        <Icon onClick={onClick}>
            <FaCartShopping />
        </Icon>
    );
}

Cart.propTypes = {
    onClick: PropTypes.func,
};