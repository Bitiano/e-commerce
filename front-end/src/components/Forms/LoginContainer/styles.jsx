import styled from "styled-components";

export const FormContainer = styled.div`
    padding: 5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        text-align: center;
        margin-bottom: 1rem;
        color: var(--text-color-dark);
    }

    p { 
        text-align: center;
        margin-top: 1rem;
        
        a {
            color: var(--text-color-dark);
            text-decoration: none;
            font-weight: 4  00;
            font-size: 1.2rem;
            transition: color 0.3s;

            &:hover {
                color: var(--accent-color);
            }
        }
    }

    button {
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
        margin-top: 1rem;

        &:hover {
            background-color: var(--accent-color);
        }
    }
`;