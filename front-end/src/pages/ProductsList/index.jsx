import { useState } from 'react';
import { Container } from '../../components/Global/Container';
import { List } from '../../components/Lists/ProductsList';
import { SearchInput } from '../../components/Inputs/SearchInput';
import { RedirectButton } from '../../components/Buttons/ButtonRedirect';
import { FaPlus } from "react-icons/fa6";

export const ProductsList = () => {
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
            <h1 style={{ textAlign: 'center', marginTop: '5rem'}}>Lista de Produtos</h1>
            <SearchInput
                value={searchTerm}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
            />
            <RedirectButton to="/backoffice/register-product" icon={<FaPlus />}> Novo Produto</RedirectButton>
            <List searchTerm={searchTerm} searchTrigger={searchTrigger} />
        </Container>
    );
};