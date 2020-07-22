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

    border: 1px dashed #CCC;
    
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

    position: absolute;

    width: ${props => props.width}px;
    height: ${props => props.height}px;

    cursor: grab;

    border: 1px dashed #CCC;
    
    &.react-draggable-dragging {
        cursor: grabbing;
        opacity: 0.6;
    }
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
`;
