import styled, { css } from 'styled-components';

interface ContainerProps {
    left: number;
    top: number;
    width: number;
    height: number;
    absolute: boolean;
}

const Container = styled.canvas<ContainerProps>`
    width: ${props => props.width}px;
    height: ${props => props.height}px;

    ${props => props.absolute && css`
        border: 2px solid transparent;
        
        position: absolute;
        left: ${props => props.left}px;
        top: ${props => props.top}px;
    `}
`;

export default Container;
