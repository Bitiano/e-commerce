import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { incluiProduto, atualizaProduto, uploadImagem, buscaProdutoPorId } from '../../../services/api/productAPI';
import { AuthContext } from '../../../contexts/AuthContext';
import { Form, ButtonDelete } from './styles.jsx';
import { MdDeleteForever } from "react-icons/md";

export const ProductForm = ({ productId }) => {
    const [nome, setNome] = useState('');
    const [avaliacao, setAvaliacao] = useState(1);
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [qtdEstoque, setQtdEstoque] = useState('');
    const [imagens, setImagens] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    const product = await buscaProdutoPorId(productId);
                    setNome(product.nome);
                    setAvaliacao(product.avaliacao);
                    setDescricao(product.descricao);
                    setPreco(product.preco);
                    setQtdEstoque(product.qtdEstoque);
                    setImagens([...product.imagesPath]);
                } catch (error) {
                    console.error("Erro ao buscar produto:", error);
                }
            };
            fetchProduct();
        }
    }, [productId]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('image', file);
                const response = await uploadImagem(formData);
                setImagens((prevImagens) => [...prevImagens, response.data.url]);
            } catch (error) {
                console.error("Erro ao fazer upload da imagem:", error);
            }
        }
    };

    const handleImageDelete = (index) => {
        setImagens((prevImagens) => prevImagens.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        const produto = {
            nome,
            avaliacao,
            descricao,
            preco: parseFloat(preco),
            qtdEstoque: parseInt(qtdEstoque, 10),
            imagesPath: imagens,
            status: true
        };

        try {
            if (productId) {
                await atualizaProduto(token, productId, produto);
            } else {
                await incluiProduto(token, produto);
            }
            navigate('/backoffice/products-list');
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
        }
    };

    const handleCancel = () => {
        navigate('/backoffice/products-list');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <label>Nome do Produto:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    maxLength={200}
                    required
                    {...user.grupo !== 'ADMIN' && { disabled: true }}
                />
            </div>
            <div>
                <label>Avaliação:</label>
                <input
                    type="number"
                    value={avaliacao}
                    onChange={(e) => setAvaliacao(parseFloat(e.target.value))}
                    min={1}
                    max={5}
                    step={0.5}
                    required
                    {...user.grupo !== 'ADMIN' && { disabled: true }}
                />
            </div>
            <div>
                <label>Descrição Detalhada:</label>
                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    maxLength={2000}
                    required
                    {...user.grupo !== 'ADMIN' && { disabled: true }}
                />
            </div>
            <div>
                <label>Preço do Produto:</label>
                <input
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    step={0.01}
                    required
                    {...user.grupo !== 'ADMIN' && { disabled: true }}
                />
            </div>
            <div>
                <label>Quantidade em Estoque:</label>
                <input
                    type="number"
                    value={qtdEstoque}
                    onChange={(e) => setQtdEstoque(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Imagens do Produto:</label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    {...user.grupo !== 'ADMIN' && { disabled: true }}
                />
                <div>
                    {imagens.map((file, index) => (
                        <div key={index}>
                            <img
                                src={file}
                                alt={`Produto ${index}`}
                                width="100"
                            />
                            {user.grupo === 'ADMIN' && (
                                <ButtonDelete type="button" onClick={() => handleImageDelete(index)}>
                                    <MdDeleteForever size={24} />
                                </ButtonDelete>
                            )}

                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button type="submit">Salvar</button>
                <button type="button" onClick={handleCancel}>Cancelar</button>
            </div>
        </Form>
    );
};

ProductForm.propTypes = {
    productId: PropTypes.string,
};