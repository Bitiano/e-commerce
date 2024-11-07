import { useParams } from 'react-router-dom';
import { Container } from '../../components/Global/Container';
import { ProductForm } from '../../components/Forms/ProductForm';

export const EditProduct = () => {
    const { id } = useParams();

    return (
        <Container>
            <h1 style={{textAlign: 'center', marginTop: '5rem'}}>Editar Produto</h1>
            <ProductForm productId={id} />
        </Container>
    );
};