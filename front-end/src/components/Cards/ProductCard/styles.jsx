import styled from "styled-components";

export const Card = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    border-radius: 10px;
    cursor: pointer;

    img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
    }

    h1 {
        font-size: 1.2rem;
        color: var(--text-color-dark);
        font-weight: 600;
        margin-top: 0.5rem;
        text-align: center;
    }

    p {
        font-size: 1.1rem;
        color: var(--text-color-dark);
        font-weight: 500;
        margin: 0.4rem 0 ;
    }
`;