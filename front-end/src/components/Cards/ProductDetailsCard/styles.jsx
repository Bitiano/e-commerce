import styled from 'styled-components';

export const Card = styled.div`
    background-color: transparent;
    display: flex;
    gap: 8rem;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 100%;

    h1 {
        font-size: 2rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: var(--text-color-dark);
        max-width: 400px;
    }

    p:nth-child(3) {
        font-size: 1.1rem;
        font-weight: 500;
        color: #10B981;
        margin: 0.5rem 0;
    }

    p:nth-child(4) {
        max-width: 400px;
    }
`;

export const Carousel = styled.div`
    position: relative;
`;

export const CarouselImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
`;

export const CarouselControls = styled.div`
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
`;

export const CarouselButton = styled.button`
    color: var(--text-color-light);
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    font-size: 1.5rem;
    transition: 0.3s;

    &:hover {
        background: rgba(0, 0, 0, 0.8);
    }
`;