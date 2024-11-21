import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { retornaPedidoDetalhe } from '../../../services/api/orderAPI';
import { Card } from './styles';

export const OrderDetailsCard = ({ id }) => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const getOrder = async () => {
            const response = await retornaPedidoDetalhe(id);
            setOrder(response);
        }

        getOrder();
    }, [id]);

    return (
        <Card>
            {order ? (
                <>
                    <h2>Detalhe do Pedido </h2>
                    <p>Endereço de Entrega: {order.endereco.logradouro}, {order.endereco.numero}, {order.endereco.bairro}, {order.endereco.cidade} - {order.endereco.uf}</p>
                    <p>Forma de Pagamento: {order.metodoDePagamento === 'BOLETO' ? 'Boleto' : 'Cartão de Crédito'}</p>
                    <h3>Produtos:</h3>
                    <ul>
                        {order.produtos.map((item, index) => (
                            <li key={index}>
                                {item.produto.nome} - R$ {item.produto.preco} x {item.quantidade}
                            </li>
                        ))}
                    </ul>
                    <p>Frete: R$ {order.valorFrete.toFixed(2)}</p>
                    <p>Total: R$ {order.total.toFixed(2)}</p>

                    <button onClick={() => window.history.back()}>Voltar</button>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </Card>
    )
}

OrderDetailsCard.propTypes = {
    id: PropTypes.string.isRequired,
}