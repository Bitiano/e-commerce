import styled from "styled-components";

export const InputContainer = styled.div`
    form {

        display: flex;
        align-items: center;    
        gap: 1rem;
        
        div {
            display: flex;
            flex-direction: column;
            gap: .5rem

            label {
                font-size: 1rem;
            }

            input {
                padding: .5rem;
                font-size: 1rem;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }

        button {
            padding: .5rem;
            font-size: 1rem;
            border-radius: 5px;
            background-color: var(--primary-color);
            color: var(--text-color-light);
            border: none;
            cursor: pointer;
        }

    }
`;