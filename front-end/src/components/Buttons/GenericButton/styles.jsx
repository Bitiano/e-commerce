import styled from "styled-components";

export const Button = styled.button`
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 2rem;
    background-color: var(--secondary-color);
    color: var(--text-color-light);
    font-size: 1.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;

    &:hover {
        background-color: var(--accent-color);
    }
`;