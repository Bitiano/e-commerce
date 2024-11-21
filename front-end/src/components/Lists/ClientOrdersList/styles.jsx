import styled from "styled-components";

export const Container = styled.div`
    min-height: 80vh;
    width: 100%;
    padding: 3rem 0;

    h1 {
        text-align: center;
        margin-bottom: 2rem;
    }
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;