import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { buscaProdutos, atualizaStatusProduto } from "../../../services/api/productAPI";
import { AuthContext } from "../../../contexts/AuthContext";
import PropTypes from 'prop-types';
import { ProductPreviewModal } from '../../Modal';
import { Table, TableHeader, TableRow, TableData, Button, PaginationWrapper, PageButton } from './styles';

export const List = ({ searchTerm, searchTrigger }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await buscaProdutos(searchTerm, page, 10);
                setProducts(data.produtos);
                setTotalPages(data.totalPage);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [searchTrigger, page]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await atualizaStatusProduto(token, id);
            const updatedProducts = products.map((product) => {
                if (product.id === id) {
                    return { ...product, status: newStatus };
                }
                return product;
            });
            setProducts(updatedProducts);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePreview = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Preço</TableHeader>
                        <TableHeader>Quantidade</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Opções</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableData>{product.code}</TableData>
                            <TableData>{product.nome}</TableData>
                            <TableData>{product.preco}</TableData>
                            <TableData>{product.qtdEstoque}</TableData>
                            <TableData>{product.status ? 'Ativo' : 'Inativo'}</TableData>
                            <TableData>
                                <Button>
                                    <Link to={`/backoffice/edit-product/${product.id}`}>Editar</Link>
                                </Button>
                                {user.grupo === 'ADMIN' && (
                                    <Button onClick={() => handleStatusChange(product.id, !product.status)}>
                                        {product.status ? 'Desativar' : 'Ativar'}
                                    </Button>
                                )}
                                <Button onClick={() => handlePreview(product)}>Preview</Button>
                            </TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            <PaginationWrapper>
                <PageButton onClick={handlePreviousPage} disabled={page === 0}>Anterior</PageButton>
                <span>Página {page + 1} de {totalPages}</span>
                <PageButton onClick={handleNextPage} disabled={page === totalPages - 1}>Próxima</PageButton>
            </PaginationWrapper>

            {selectedProduct && (
                <ProductPreviewModal product={selectedProduct} onClose={handleCloseModal} />
            )}
        </>
    );
};

List.propTypes = {
    searchTerm: PropTypes.string,
    searchTrigger: PropTypes.bool,
};
