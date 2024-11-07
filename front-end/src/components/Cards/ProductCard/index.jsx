import { Card } from './styles';
import { BuyButton } from '../../Buttons/BuyButton';
import { AddCartButton } from '../../Buttons/AddCartButton';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../contexts/CartContext';

export const ProductCard = ({ productKey, product }) => {
    const { nome, preco, imagesPath } = product;
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const handleBuyClick = () => {
        navigate(`/product/${productKey}`);
    };

    const handleAddToCartClick = () => {
        addToCart(product);
    };

    return (
        <Card onClick={handleBuyClick}>
            <img src={imagesPath[0]} alt={`Produto ${nome}`} />
            <h1>{nome}</h1>
            <p>R$ {preco}</p>
            <AddCartButton onClick={handleAddToCartClick} />
        </Card>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    productKey: PropTypes.number.isRequired,
};