import styled from "styled-components"

export const HeaderContainer = styled.header`
    background-color: var( --primary-color);
    padding: 1rem 0;

    nav {
        display: flex;
        justify-content: space-between;
        ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            list-style: none;

            li {

                a {
                    color: var(--text-color-light);
                    font-size: 1.1rem;
                    text-decoration: none;
                    transition: 0.3s;
                    &:hover {
                        color: var(--accent-color);
                    }
                }

                button {
                    background-color: transparent;
                    border: none;
                    color: var(--text-color-light);
                    font-size: 1.4rem;
                    cursor: pointer;
                    transition: 0.3s;
                    &:hover {
                        color: var(--accent-color);
                    }
                }
            }
        }   
    }
`;

export const Logo = styled.div`
    img {
        width: 100px;
    }
`;
