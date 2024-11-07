import { useState } from 'react';
import { Container } from '../../components/Global/Container';
import { UserList } from '../../components/Lists/UsersList';
import { SearchInput } from '../../components/Inputs/SearchInput';
import { RedirectButton } from '../../components/Buttons/ButtonRedirect';
import { FaPlus } from "react-icons/fa6";

export const UsersList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTrigger, setSearchTrigger] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        setSearchTrigger(prev => !prev);
    };

    return (
        <Container>
            <h1>Lista de Usuarios</h1>
            <SearchInput
                value={searchTerm}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
            />

            <RedirectButton to="/backoffice/register-user" icon={<FaPlus />}> Novo Usuario</RedirectButton>
            <UserList searchTerm={searchTerm} searchTrigger={searchTrigger} />
        </Container>
    )
};