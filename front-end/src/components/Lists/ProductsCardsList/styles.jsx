import styled from "styled-components";


export const ListContainer = styled.div`
    padding:  4rem 0;

    h1 {
        text-align: center;
        margin-bottom: 1rem;
        color: var(--text-color-dark);
    }

    p {
        text-align: center;
        margin-top: 1rem;
        color: var(--text-color-dark);
    }
`; 


export const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    list-style: none;
    padding: 1rem;
    margin-top: 1rem;
`;