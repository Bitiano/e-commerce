/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';
import { Card, Carousel, CarouselImage, CarouselControls, CarouselButton } from './styles';
import { BuyButton } from '../../Buttons/BuyButton';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../contexts/CartContext';

export const ProductDetailsCard = ({ product, isPreview }) => {
    if (!product) return null;

    const { nome, descricao, preco, imagesPath, avaliacao } = product;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleBuyClick = () => {
        if (!isPreview) {
            addToCart(product);
            navigate('/cart');
        }
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesPath.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagesPath.length) % imagesPath.length);
    };

    return (
        <Card>
            <Carousel>
                <CarouselImage src={imagesPath[currentImageIndex]} alt={`Produto ${currentImageIndex}`} />
                <CarouselControls>
                    <CarouselButton onClick={handlePrevImage}>{"<"}</CarouselButton>
                    <CarouselButton onClick={handleNextImage}>{">"}</CarouselButton>
                </CarouselControls>
            </Carousel>

            <div>
                <h1>{nome}</h1>
                <ReactStars
                    count={5}
                    value={avaliacao}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                />
                <p>R$ {preco}</p>
                <p>{descricao}</p>
                <BuyButton onClick={handleBuyClick} disabled={isPreview} />
            </div>
        </Card>
    );
};

ProductDetailsCard.propTypes = {
    product: PropTypes.object.isRequired,
    isPreview: PropTypes.bool,
};