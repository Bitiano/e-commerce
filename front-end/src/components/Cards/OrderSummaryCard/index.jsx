import PropTypes from 'prop-types';
import { Card } from './styles.jsx';

export const OrderSummaryCard = ({ endereco, formaPagamento, produtos, frete, onConfirmOrder }) => {
    console.log(frete)
    const calcularTotal = () => {
        const totalProdutos = produtos.reduce((total, item) => total + item.produto.preco * item.quantidade, 0);
        const totalFrete = frete && frete.price ? frete.price : 0;
        return totalProdutos + totalFrete;
    };

    return (
        <Card>
            <h2>Resumo do Pedido</h2>
            <p>Endereço de Entrega: {endereco.logradouro}, {endereco.numero}, {endereco.bairro}, {endereco.cidade} - {endereco.uf}</p>
            <p>Forma de Pagamento: {formaPagamento === 'BOLETO' ? 'Boleto' : 'Cartão de Crédito'}</p>
            <h3>Produtos:</h3>
            <ul>
                {produtos.map((item, index) => (
                    <li key={index}>
                        {item.produto.nome} - R$ {item.produto.preco} x {item.quantidade}
                    </li>
                ))}
            </ul>
            <p>Frete: R$ {frete && frete.price ? frete.price.toFixed(2) : '0.00'}</p>
            <p>Total: R$ {calcularTotal().toFixed(2)}</p>
            <button onClick={onConfirmOrder}>Confirmar Pedido</button>
        </Card>
    );
};

OrderSummaryCard.propTypes = {
    endereco: PropTypes.object.isRequired,
    formaPagamento: PropTypes.string.isRequired,
    produtos: PropTypes.arrayOf(PropTypes.object).isRequired,
    frete: PropTypes.shape({
        price: PropTypes.number,
    }),
    onConfirmOrder: PropTypes.func.isRequired,
};