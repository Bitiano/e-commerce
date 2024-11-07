import styled from "styled-components";

export const List = styled.ul`
    list-style: none;
    border: 1px solid #ccc;
    width: fit-content;
    padding: .5rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1rem;    

        input {
            height: 20px;
        }
    }
`;