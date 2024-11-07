import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background: var(--background-color);    
    padding: 1.5rem;
    border-radius: 10px;
    position: relative;
    width: 60%;
`;

export const CloseButton = styled.button`
    position: absolute;
    right: 2rem;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;