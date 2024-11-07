import styled from 'styled-components';

export const Button = styled.button`
    background-color: var(--primary-color);
    color: var(--text-color-light);
    padding: 0.5rem ;
    border: none;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 500;
    transition: background-color 0.3s;

    &:hover {
        color: var(--accent-color);
    }
`;