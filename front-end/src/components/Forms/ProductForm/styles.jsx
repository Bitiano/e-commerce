import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: var(--primary-color);
    padding: 2rem;
    border-radius: 0.25rem;
    color: var(--text-color-light);
    max-width: 500px;
    width: 100%;
    margin: 2rem auto;

    div {
        display: flex;
        flex-direction: column;
        width: 100%;

        label {
            margin-bottom: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
        }

        input {
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 0.25rem;
            font-size: 1rem;
            width: 100%;
        }

        select {
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 0.25rem;
            font-size: 1rem;
            width: 100%;
        }
    }

    & > div:last-child {
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
        margin-bottom: 1rem;

        &:hover {
            background-color: var(--accent-color);
        }
    }
}
    
`;

export const ButtonDelete = styled.button`
    background-color: #e48080;
    color: var(--text-color-light);
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    padding: 0.25rem;
    margin-top: 0.5rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: var(--danger-color-dark);
    }
`;