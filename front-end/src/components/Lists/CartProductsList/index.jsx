import { useContext } from 'react';
import { CartContainer, ListProducts, QuantityButton } from './styles';
import { CartContext } from '../../../contexts/CartContext';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";

export const CartProductsList = () => {
    const { cart, updateQuantity, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

    return (
        <CartContainer>
            <h1>Carrinho</h1>
            {cart.length === 0 ? (
                <p>Seu carrinho está vazio</p>
            ) : (
                <ListProducts>
                    {cart.map((item) => (
                        <li key={item.id}>
                            <div>
                                <img src={item.imagesPath[0]} alt={`Produto ${item.nome}`} />
                                <h2>{item.nome}</h2>
                            </div>
                            <div>
                                <div> 
                                    <p>Valor </p>
                                    <p>R$ {item.preco}</p>
                                </div>

                                <div>
                                    <p>Quantidade</p>
                                    <div> 
                                        <QuantityButton onClick={() => decrementQuantity(item.id)}>
                                            <FaMinus />
                                        </QuantityButton>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                                            min="1"
                                        />
                                        <QuantityButton onClick={() => incrementQuantity(item.id)}>
                                            <FaPlus />
                                        </QuantityButton>
                                    </div>

                                </div>
                                <button onClick={() => removeFromCart(item.id)}>
                                    <MdDeleteForever />
                                </button>
                            </div>
                        </li>
                    ))}
                </ListProducts>
            )}
        </CartContainer>
    )
};