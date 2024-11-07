import { useEffect, useState } from "react";
import { buscaProdutos } from "../../../services/api/productAPI";
import { ProductCard } from "../../Cards/ProductCard";
import { List, ListContainer } from "./styles";

export const ProductsCardsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await buscaProdutos();
                setProducts(data.produtos);
            } catch (error) {
                setError('Ocorreu um erro ao buscar os produtos');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) {
        return <p>Carregando produtos...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <ListContainer>
        <h1 > Bem-Vindo à YKS! </h1>
        <p>
            Aqui você encontra os melhores produtos, com os melhores preços!
        </p>
        <List>
            
            {products.map((product) => (
                <ProductCard key={product.id} productKey={product.id} product={product} />
            ))}
        </List>
        </ListContainer>
    )
};
