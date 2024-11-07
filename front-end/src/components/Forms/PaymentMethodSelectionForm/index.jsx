import PropTypes from 'prop-types';
import { useState } from 'react';
import { Container, List, Form } from './styles.jsx';

export const PaymentMethodSelectionForm = ({ 
    formaPagamento, 
    onPaymentSelect, 
    cartaoNumero, 
    setCartaoNumero, 
    cartaoNome, 
    setCartaoNome, 
    cartaoValidade, 
    setCartaoValidade, 
    cartaoCVV, 
    setCartaoCVV,
    onProceed 
}) => {
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        if (formaPagamento === 'CARTAO') {
            if (!cartaoNumero) newErrors.cartaoNumero = 'Número do Cartão é obrigatório';
            if (!cartaoNome) newErrors.cartaoNome = 'Nome no Cartão é obrigatório';
            if (!cartaoValidade) newErrors.cartaoValidade = 'Validade é obrigatória';
            if (!cartaoCVV) newErrors.cartaoCVV = 'CVV é obrigatório';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProceed = () => {
        if (validateFields()) {
            onProceed();
        }
    };

    return (
        <Container>
            <h2>Escolha a Forma de Pagamento</h2>
            <List>
                <li>
                    <input
                        type="radio"
                        id="BOLETO"
                        name="payment"
                        onChange={() => onPaymentSelect('BOLETO')}
                    />
                    <label htmlFor="BOLETO">Boleto</label>
                </li>
                <li>
                    <input
                        type="radio"
                        id="CARTAO"
                        name="payment"
                        onChange={() => onPaymentSelect('CARTAO')}
                    />
                    <label htmlFor="CARTAO">Cartão de Crédito</label>
                </li>
            </List>

            {formaPagamento === 'CARTAO' && (
                <div>
                    <Form>
                        <div>
                            <label>Número do Cartão:</label>
                            <input
                                type="text"
                                value={cartaoNumero}
                                onChange={(e) => setCartaoNumero(e.target.value)}
                                required
                            />
                            {errors.cartaoNumero && <p style={{ color: 'red' }}>{errors.cartaoNumero}</p>}
                        </div>
                        <div>
                            <label>Nome no Cartão:</label>
                            <input
                                type="text"
                                value={cartaoNome}
                                onChange={(e) => setCartaoNome(e.target.value)}
                                required
                            />
                            {errors.cartaoNome && <p style={{ color: 'red' }}>{errors.cartaoNome}</p>}
                        </div>
                        <div>
                            <label>Validade:</label>
                            <input
                                type="text"
                                value={cartaoValidade}
                                onChange={(e) => setCartaoValidade(e.target.value)}
                                required
                            />
                            {errors.cartaoValidade && <p style={{ color: 'red' }}>{errors.cartaoValidade}</p>}
                        </div>
                        <div>
                            <label>CVV:</label>
                            <input
                                type="text"
                                value={cartaoCVV}
                                onChange={(e) => setCartaoCVV(e.target.value)}
                                required
                            />
                            {errors.cartaoCVV && <p style={{ color: 'red' }}>{errors.cartaoCVV}</p>}
                        </div>
                    </Form>
                </div>
            )}

            <button onClick={handleProceed}>Resumo do Pedido</button>
        </Container>
    );
};

PaymentMethodSelectionForm.propTypes = {
    formaPagamento: PropTypes.string,
    onPaymentSelect: PropTypes.func.isRequired,
    cartaoNumero: PropTypes.string.isRequired,
    setCartaoNumero: PropTypes.func.isRequired,
    cartaoNome: PropTypes.string.isRequired,
    setCartaoNome: PropTypes.func.isRequired,
    cartaoValidade: PropTypes.string.isRequired,
    setCartaoValidade: PropTypes.func.isRequired,
    cartaoCVV: PropTypes.string.isRequired,
    setCartaoCVV: PropTypes.func.isRequired,
    onProceed: PropTypes.func.isRequired,
};