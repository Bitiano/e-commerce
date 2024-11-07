import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;

    h2 {
        margin-bottom: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-color-light);
        background-color: var(--primary-color);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 1rem;
    }
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;

    li {
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-color-dark);
    }

`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        label {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-color-dark);
        }

        input {
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    }

`;
