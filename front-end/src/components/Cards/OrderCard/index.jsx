import PropTypes from 'prop-types';
import { Card } from './styles';

export const OrderCard = ({ order }) => {
    return (
        <Card>
            <h2>Pedido #{order.id}</h2>

            <p>Data do pedido: {order.dataDoPedido}</p>
            <div>
                <p>Valor total: R$ {order.total}</p>
                <p>Status do pedido: {order.status}</p>
                <p>Codigo do pedido: {order.pedidoCode}</p>
            </div>

            <button>Detalhes</button>
        </Card>
    )
}
    
OrderCard.propTypes = {
    order: PropTypes.object.isRequired,
}
