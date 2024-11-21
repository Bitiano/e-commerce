import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

export const TableHeader = styled.th`
    padding: 10px;
    background-color: #f4f4f4;
    text-align: left;
    font-weight: bold;
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid #ddd;
`;

export const TableData = styled.td`
    padding: 10px;
    text-align: left;
`;

export const Button = styled.button`
    padding: 8px 12px;
    margin-right: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 14px;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    a {
        color: white;
        text-decoration: none;
    }
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const PageButton = styled.button`
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 10px;
    text-transform: uppercase;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;
