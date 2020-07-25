import styled from 'styled-components';

interface StaticContainerProps {
    left: number;
    top: number;
    width: number;
    height: number;
}

const StaticContainer = styled.div<StaticContainerProps>`
    user-select: none;
    
    overflow: hidden;

    border: 2px solid transparent;

    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;

export default StaticContainer;
