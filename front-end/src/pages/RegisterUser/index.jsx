import { Container } from '../../components/Global/Container';
import { UserForm } from '../../components/Forms/UserForm';

export const RegisterUser = () => {
    return (
        <Container>
            <h1>Cadastrar Usuario</h1>
            <UserForm />
        </Container>
    );
};