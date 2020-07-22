import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';

interface ResizableContainerProps {
    left: number;
    top: number;
}

export const ResizableContainer = styled(ResizableBox)<ResizableContainerProps>`
    user-select: none;

    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;

    background: blue;
    
    .react-resizable-handle {
        background: red;
    }
`;

interface DraggableContainerProps {
    width: number;
    height: number;
}

export const DraggableContainer = styled.div<DraggableContainerProps>`
    user-select: none;

    width: ${props => props.width}px;
    height: ${props => props.height}px;

    background: blue;
`;

interface StaticContainerProps {
    left: number;
    top: number;
    width: number;
    height: number;
}

export const StaticContainer = styled.div<StaticContainerProps>`
    user-select: none;

    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;

    background: blue;
`;
