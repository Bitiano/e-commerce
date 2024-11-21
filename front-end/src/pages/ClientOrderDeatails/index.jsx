import { useParams } from 'react-router-dom';
import { Container } from '../../components/Global/Container';
import { OrderDetailsCard } from '../../components/Cards/OrderDetailsCard';

export const ClientOrderDetails = () => {
    const { id } = useParams();
    return (
        <Container>
            <OrderDetailsCard id={id} />
        </Container>
    );
};