import styled from "styled-components";

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    width: 100%;
    border: none;
    border-radius: 0.25rem;
    background-color: var(--secondary-color);
    color: var(--text-color-light);
    font-size: 1.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: .2rem;

    &:hover {
        background-color: var(--accent-color);
    }
`;