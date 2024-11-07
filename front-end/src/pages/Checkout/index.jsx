import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import { AddressForm } from '../../components/Forms/ClientAddresForm';
import { Container } from '../../components/Global/Container';
import { incluiPedido } from '../../services/api/orderAPI';
import { buscaEnderecosPorCliente, adicionaEndereco } from '../../services/api/addressAPI';
import { AddressSelection } from '../../components/Lists/AddressSelectionList';
import { PaymentMethodSelectionForm } from '../../components/Forms/PaymentMethodSelectionForm';
import { OrderSummaryCard } from '../../components/Cards/OrderSummaryCard';
import { GenericButton } from '../../components/Buttons/GenericButton';

export const Checkout = () => {
    const { user, loading } = useContext(AuthContext);
    const { cart, freight, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [enderecos, setEnderecos] = useState([]);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [formaPagamento, setFormaPagamento] = useState(null);
    const [cartaoNumero, setCartaoNumero] = useState('');
    const [cartaoNome, setCartaoNome] = useState('');
    const [cartaoValidade, setCartaoValidade] = useState('');
    const [cartaoCVV, setCartaoCVV] = useState('');
    const [orderNumber, setOrderNumber] = useState(null);
    const [fase, setFase] = useState(1);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/login');
            } else {
                const fetchEnderecos = async () => {
                    const token = localStorage.getItem('token');
                    const enderecos = await buscaEnderecosPorCliente(token);
                    setEnderecos(enderecos);
                };
                fetchEnderecos();
            }
        }
    }, [user, loading, navigate]);

    const handleEnderecoSelect = (endereco) => {
        setEnderecoSelecionado(endereco);
    };

    const handleProceed = () => {
        if (enderecoSelecionado) {
            setFase(2);
        } else {
            alert('Por favor, selecione um endereço de entrega.');
        }
    };

    const handleAddAddress = async (newAddress) => {
        try {
            const token = localStorage.getItem('token');
            await adicionaEndereco(token, newAddress);
            const enderecosAtualizados = await buscaEnderecosPorCliente(token);
            setEnderecos(enderecosAtualizados);
            setShowAddressForm(false);
            setEnderecoSelecionado(newAddress);
        } catch (error) {
            console.error('Erro ao adicionar endereço:', error);
            alert('Erro ao adicionar endereço!');
        }
    };

    const handlePaymentSelect = (paymentMethod) => {
        setFormaPagamento(paymentMethod);
    };

    const handlePaymentProceed = () => {
        if (formaPagamento === 'CARTAO') {
            if (!cartaoNumero || !cartaoNome || !cartaoValidade || !cartaoCVV) {
                alert('Por favor, preencha todos os campos do cartão de crédito.');
                return;
            }
        }

        if (formaPagamento) {
            setFase(3);
        } else {
            alert('Por favor, selecione uma forma de pagamento.');
        }
    };

    const handleConfirmOrder = async () => {
        if (!enderecoSelecionado || !formaPagamento || !freight) {
            alert('Por favor, selecione um endereço de entrega, uma forma de pagamento e uma opção de frete.');
            return;
        }

        const token = localStorage.getItem('token');
        const produtos = cart.map(item => ({
            produto: {
                nome: item.nome,
                preco: item.preco,
                img: item.imagesPath[0]
            },
            quantidade: item.quantity
        }));

        const totalProdutos = cart.reduce((total, item) => total + item.preco * item.quantity, 0);
        const totalFrete = freight.price;
        const totalPedido = totalProdutos + totalFrete;

        const pedidoDto = {
            enderecoId: enderecoSelecionado.id,
            formaPagamento,
            produtos,
            frete: {
                tipo: freight.label,
                valor: freight.price
            },
            total: totalPedido
        };

        try {
            const response = await incluiPedido(token, pedidoDto);
            setOrderNumber(response);
            setFase(4);
            clearCart();
            alert('Pedido criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            alert('Erro ao criar pedido!');
        }
    };

    const handleBack = () => {
        setFase(fase - 1);
    };

    const handleOk = () => {
        navigate('/');
    };

    const handleViewOrder = () => {
        navigate('/profile/orders-list');
    };

    const enderecosEntrega = enderecos.filter(endereco => !endereco.enderecoFaturamento);

    return (
        <Container>
            <div style={{ padding: '2rem 0' }}>
                <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Finalizar Pedido</h1>
                {fase === 1 && (
                    <>
                        <AddressSelection
                            enderecos={enderecosEntrega}
                            onEnderecoSelect={handleEnderecoSelect}
                            onAddAddress={() => setShowAddressForm(true)}
                        />
                        {showAddressForm && <AddressForm onSubmit={handleAddAddress} />}
                        <GenericButton onClick={handleProceed}>Prosseguir</GenericButton>
                    </>
                )}

                {fase === 2 && (
                    <>
                        <PaymentMethodSelectionForm
                            formaPagamento={formaPagamento}
                            onPaymentSelect={handlePaymentSelect}
                            cartaoNumero={cartaoNumero}
                            setCartaoNumero={setCartaoNumero}
                            cartaoNome={cartaoNome}
                            setCartaoNome={setCartaoNome}
                            cartaoValidade={cartaoValidade}
                            setCartaoValidade={setCartaoValidade}
                            cartaoCVV={cartaoCVV}
                            setCartaoCVV={setCartaoCVV}
                            onProceed={handlePaymentProceed}
                        />
                        <button onClick={handleBack} style={{ marginTop: '1rem' }}>Voltar</button>
                    </>
                )}

                {fase === 3 && (
                    <>
                        <OrderSummaryCard
                            endereco={enderecoSelecionado}
                            formaPagamento={formaPagamento}
                            produtos={cart.map(item => ({
                                produto: {
                                    nome: item.nome,
                                    preco: item.preco,
                                    img: item.imagesPath[0]
                                },
                                quantidade: item.quantity
                            }))}
                            frete={freight}
                            onConfirmOrder={handleConfirmOrder}
                        />
                        <button onClick={handleBack} style={{ marginTop: '1rem' }}>Voltar</button>
                    </>
                )}

                {fase === 4 && (
                    <div
                        style={{
                            backgroundColor: "var(--background-color)",
                            border: "1px solid var(--primary-color)",
                            borderRadius: "8px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            maxWidth: "400px",
                            margin: "1rem auto",
                            textAlign: "center",
                            color: "var(--text-color-dark)",
                        }}
                    >
                        <h2
                            style={{
                                color: "var(--primary-color)",
                                fontSize: "1.5rem",
                                marginBottom: "1rem",
                            }}
                        >
                            Pedido Confirmado
                        </h2>
                        <p style={{ marginBottom: "0.5rem" }}>Número do Pedido: {orderNumber}</p>
                        <p style={{ marginBottom: "1.5rem" }}>
                            Seu pedido foi criado com sucesso e está aguardando pagamento.
                        </p>
                        <button
                            onClick={handleOk}
                            style={{
                                backgroundColor: "var(--accent-color)",
                                color: "var(--text-color-light)",
                                border: "none",
                                borderRadius: "5px",
                                padding: "0.75rem 1.5rem",
                                fontSize: "1rem",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                marginRight: "0.5rem",
                            }}
                        >
                            Ok
                        </button>
                        <button
                            onClick={handleViewOrder}
                            style={{
                                backgroundColor: "var(--secondary-color)",
                                color: "var(--text-color-light)",
                                border: "none",
                                borderRadius: "5px",
                                padding: "0.75rem 1.5rem",
                                fontSize: "1rem",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                            }}
                        >
                            Ver Pedido
                        </button>
                    </div>

                )}
            </div>
        </Container>
    );
};