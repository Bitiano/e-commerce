import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card } from './styles';

const statusLabels = {
    AGUARDANDOPAGAMENTO: 'Aguardando Pagamento',
    PAGAMENTOREJEITADO: 'Pagamento Rejeitado',
    PAGAMENTOCOMSUCESSO: 'Pagamento com Sucesso',
    AGUARDANDORETIRADA: 'Aguardando Retirada',
    EMTRANSITO: 'Em Trânsito',
    ENTREGUE: 'Entregue',
};

export const OrderCard = ({ order }) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/profile/order-details/${order.id}`);
    }

    return (
        <Card>
            <h2>Pedido</h2>

            <p>Data do pedido: {order.dataDoPedido}</p>
            <div>
                <p>Valor total: R$ {order.total}</p>
                <p>Status do pedido: {statusLabels[order.status]}</p>
                <p>Codigo do pedido: {order.pedidoCode}</p>
            </div>

            <button onClick={handleDetailsClick}>Detalhes do pedido</button>
        </Card>
    );
};

OrderCard.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        dataDoPedido: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        pedidoCode: PropTypes.string.isRequired,
    }).isRequired,
};