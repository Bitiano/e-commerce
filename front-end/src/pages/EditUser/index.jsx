import { Container } from "../../components/Global/Container";
import { UserForm } from "../../components/Forms/UserForm";
import { useParams } from "react-router-dom";

export const EditUser = () => {
    const { id } = useParams();

    return (
        <Container>
            <h1>Editar Usuario</h1>
            <UserForm userId={id} />
        </Container>
    );
};