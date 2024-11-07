import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../components/Global/Container';
import { ProductDetailsCard } from '../../components/Cards/ProductDetailsCard';
import { buscaProdutoPorId } from '../../services/api/productAPI';

export const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await buscaProdutoPorId(id);
                setProduct(data);
            } catch (error) {
                setError('Erro ao buscar detalhes do produto');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Container>
            <h1 style={{textAlign: 'center', margin: '3rem 0'}}>Detalhes do Produto</h1>
            {product && <ProductDetailsCard product={product} />}
        </Container>
    );
};