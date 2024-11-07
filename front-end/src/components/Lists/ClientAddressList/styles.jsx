import styled from 'styled-components';

export const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    max-width: 600px;
    margin: 2rem auto;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: var(--background-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    li {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        border-bottom: 1px solid var(--text-color-dark);
        color: var(--text-color-dark);

        &:last-child {
            border-bottom: none;
        }

        input[type="checkbox"] {
            margin-right: 1rem;
            transform: scale(1.2);
            accent-color: var(--primary-color);
        }

        &:hover {
            background-color: var(--secondary-color);
            color: var(--text-color-light);
            cursor: pointer;
        }
    }
`;
