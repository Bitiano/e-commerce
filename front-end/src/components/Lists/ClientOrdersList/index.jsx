import { useEffect, useState } from 'react';
import { List, Container } from './styles';
import { OrderCard } from '../../Cards/OrderCard';
import { retornaPedidosPorCliente } from '../../../services/api/orderAPI';

export const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fecthOrders = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const data = await retornaPedidosPorCliente(token);
                setOrders(data);
            } catch (error) {
                setError("Erro ao buscar pedidos");
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fecthOrders();
    }, []);

    if (loading) return <p>Carregando...</p>

    if (error) return <p>{error}</p>

    return (
        <Container>
            <h1>Meus pedidos</h1>
            <List>
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </List>
        </Container>
    )
}
