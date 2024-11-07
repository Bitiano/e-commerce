import { Container } from '../../components/Global/Container';
import { ProductForm } from '../../components/Forms/ProductForm';

export const RegisterProduct = () => {
    return (
        <Container>
            <h1 style={{textAlign: 'center', marginTop:'2rem' }}>Cadastro de Produto</h1>
            <ProductForm />
        </Container>
    );
};