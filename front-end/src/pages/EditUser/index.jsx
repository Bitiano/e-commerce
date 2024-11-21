import { Container } from "../../components/Global/Container";
import { UserForm } from "../../components/Forms/UserForm";
import { useParams } from "react-router-dom";

export const EditUser = () => {
    const { id } = useParams();

    return (
        <Container>
            <UserForm userId={id} />
        </Container>
    );
};