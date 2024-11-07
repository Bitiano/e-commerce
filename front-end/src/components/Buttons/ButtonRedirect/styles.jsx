import styled from 'styled-components';

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
    color: var(--text-color-light);
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    
    &:hover {
        background-color: var(--secondary-color);
        transform: scale(1.05);
    }

    &:active {
        background-color: var(--accent-color);
    }

    svg {
        margin-right: 8px;
    }
`;
