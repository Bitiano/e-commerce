import styled from 'styled-components';

export const CartContainer = styled.div`
    padding: 3rem 0;
    h1 {
        font-size: 2rem;
        color: var(--text-color-dark);
        text-align: center;
        margin-bottom: 2rem;
    }

`;

export const ListProducts = styled.ul`
    list-style: none;
    width: 1005;
    
    li {
        display: flex;
        gap: 1rem;  
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 10px;
        margin-bottom: 1rem;

        img {
            width: 100px;
            height: 100px;
            border-radius: 10px;
        }

        h2 {
            font-size: 1.3rem;
            color: var(--text-color-dark);
        }

        & > div:nth-child(1) {
            display: flex;
            gap: 1rem;
            align-items: center;
            width: 100%;
        }

        & > div:nth-child(2) {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 5rem;

            & > div {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                align-items: center;
            }

            & > div:nth-child(2) { 
                
                div {
                    display: flex;
                    align-items: center;
                    gap: .2rem;

                    input {
                        width: 50px;
                        height: 30px;
                        text-align: center;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                    
                }
            }

            & > button {
                background: none;
                border: none; 
                cursor: pointer;
                color: var(--text-color-dark);  
                font-size: 2rem;
                transition: color 0.2s;

                &:hover {
                    color: var(--primary-color);
                }
            }
        }
    }
`;

export const QuantityButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-color-dark);
    font-size: 1.5rem;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
        color: var(--primary-color);
    }
`;