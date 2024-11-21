import styled from 'styled-components';

export const Card = styled.div`
    background-color: var(--background-color);
    padding: 1.5rem;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
    transition: box-shadow 0.3s;

    &:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    h2 {
        font-size: 1.5rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    p {
        color: var(--text-color-dark);
        margin: 0.5rem 0;
    }

    div {
        margin-top: 1rem;
        padding: 1rem;
        background-color: var(--secondary-color);
        border-radius: 5px;
    }

    button {
        margin-top: 1.5rem;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        color: var(--text-color-light);
        background-color: var(--accent-color);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
`;
