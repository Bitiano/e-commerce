import styled from "styled-components";

export const Icon = styled.div`
    position: relative;

    svg {
        font-size: 1.1rem;
        color: var(--text-color-light);
        transition: 0.3s;

        &:hover {
            color: var(--accent-color);
        }
    }
`;