import styled from 'styled-components';

export const Card = styled.div`
    background-color: var(--background-color);
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: var(--text-color-dark);
    max-width: 400px;
    margin: 1rem auto;

    h2 {
        color: var(--primary-color);
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    h3 {
        font-size: 1.2rem;
        color: var(--secondary-color);
        margin: 1rem 0;
    }

    p {
        margin: 0.5rem 0;
        color: var(--text-color-dark);
    }

    ul {
        list-style: none;
        padding-left: 0;
        margin: 1rem 0;

        li {
            font-size: 0.9rem;
            padding: 0.3rem 0;
            border-bottom: 1px solid var(--background-color);
        }
    }

    button {
        background-color: var(--accent-color);
        color: var(--text-color-light);
        border: none;
        border-radius: 5px;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: var(--secondary-color);
        }

        &:active {
            background-color: var(--primary-color);
        }
    }
`;
