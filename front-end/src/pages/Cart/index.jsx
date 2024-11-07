import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/Global/Container';
import { CartProductsList } from '../../components/Lists/CartProductsList';
import { FreightCard } from '../../components/Cards/FreightCard';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';

export const Cart = () => {
    const { cart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [freight, setFreight] = useState(null);
    const navigate = useNavigate();

    const handleFreightChange = (freight) => {
        setFreight(freight);
    };

    const calculateTotal = () => {
        const productsTotal = cart.reduce((total, item) => total + item.preco * item.quantity, 0);
        const freightTotal = freight ? freight.price : 0;
        return productsTotal + freightTotal;
    };

    const handleCheckout = () => {
            if (cart.length === 0) {
            alert('Seu carrinho está vazio. Adicione produtos antes de prosseguir para o checkout.');
            return;
        }
        if (user) {
            navigate('/cart/checkout');
        } else {
            navigate('/login');
        }
    };

    return (
        <Container>
            <div style={{ display: 'flex', gap: '5rem', alignItems: 'center' }}>
                <CartProductsList />
                {cart.length > 0 && (
                    <>
                        <FreightCard onFreightChange={handleFreightChange} />
                    </>
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Total: R$ {calculateTotal().toFixed(2)}</h2>
                <button onClick={handleCheckout} 
                style={{ 
                    padding: '0.5rem 2rem', 
                    backgroundColor: '#60A5FA', 
                    color: '#F9FAFB', 
                    fontSize: '1.3rem', 
                    fontWeight: '500', 
                    cursor: 'pointer', 
                    border: 'none' }}
                    >Finalizar Compra</button>
            </div>
        </Container>
    );
};