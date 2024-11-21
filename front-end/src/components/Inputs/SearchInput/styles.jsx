import styled from 'styled-components';

export const Input = styled.input`
    width: 80%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    margin: 20px 5px;
    transition: border-color 0.3s ease-in-out;

    &:focus {
        border-color: #007bff;
        outline: none;
    }

    &::placeholder {
        color: #aaa;
    }
`;
