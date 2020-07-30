import styled from 'styled-components';

interface ImageContainerProps {
    image: string;
}

export const ImageContainer = styled.div<ImageContainerProps>`
    width: 100%;
    height: 100%;
    background: url(${props => props.image});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;

interface StaticContainerProps {
    left: number;
    top: number;
    width: number;
    height: number;
}

export const StaticContainer = styled.div<StaticContainerProps>`
    user-select: none;

    overflow: hidden;

    border: 2px solid transparent;

    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;
