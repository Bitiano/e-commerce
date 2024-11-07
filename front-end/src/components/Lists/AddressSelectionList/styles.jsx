import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button {
        padding: 0.5rem;
        background-color: var(--primary-color);
        border-radius: 0.25rem;
        color: #fff;
        font-size: 1.3rem;
        border: none;
        cursor: pointer;
        margin-bottom: 1rem;
    }
`;

export const List = styled.ul`
    list-style: none;

    li { 
        display: flex;
        gap: 1rem;
        align-items: center;
    }
`;