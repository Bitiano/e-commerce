import { useEffect, useState } from 'react';
import { retornaTodosPedidos, atualizaStatusPedido } from '../../../services/api/orderAPI';
import { Table, TableHeader, TableRow, TableData, Title } from './styles';

const statusOptions = [
    { value: 0, label: 'Aguardando Pagamento' },
    { value: 1, label: 'Pagamento Rejeitado' },
    { value: 2, label: 'Pagamento com Sucesso' },
    { value: 3, label: 'Aguardando Retirada' },
    { value: 4, label: 'Em Trânsito' },
    { value: 5, label: 'Entregue' },
];

const statusMap = {
    AGUARDANDOPAGAMENTO: 0,
    PAGAMENTOREJEITADO: 1,
    PAGAMENTOCOMSUCESSO: 2,
    AGUARDANDORETIRADA: 3,
    EMTRANSITO: 4,
    ENTREGUE: 5,
};

export const List = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await retornaTodosPedidos();
            const reversedOrders = orders.reverse();
            setOrders(reversedOrders);
        }

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        const order = orders.find(order => order.id === orderId);
        const confirmChange = window.confirm(`Deseja realmente alterar o status do pedido ${order.pedidoCode} para ${statusOptions.find(option => option.value === newStatus).label}?`);
        if (confirmChange) {
            try {
                await atualizaStatusPedido(orderId, newStatus);
                alert('Status atualizado com sucesso!');
                const updatedOrders = await retornaTodosPedidos();
                const reversedOrders = updatedOrders.reverse();
                setOrders(reversedOrders);
            } catch (error) {
                console.error('Erro ao atualizar status do pedido:', error);
                alert('Erro ao atualizar status do pedido!');
            }
        } else {
            setSelectedStatus((prevStatus) => ({
                ...prevStatus,
                [orderId]: statusMap[order.status],
            }));
        }
    };

    return (
        <>
            <Title>Lista de Pedidos</Title>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>Data</TableHeader>
                        <TableHeader>Codigo</TableHeader>
                        <TableHeader>Valor Total</TableHeader>
                        <TableHeader>Status</TableHeader>
                    </TableRow>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableData>{order.dataDoPedido}</TableData>
                            <TableData>{order.pedidoCode}</TableData>
                            <TableData>R$ {order.total}</TableData>
                            <TableData>
                                <select
                                    value={selectedStatus[order.id] !== undefined ? selectedStatus[order.id] : statusMap[order.status]}
                                    onChange={(e) => handleStatusChange(order.id, parseInt(e.target.value))}
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </>
    )
}