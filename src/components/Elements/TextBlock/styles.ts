import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
import { ThemeContextData } from '../../../contexts/theme';

interface ResizableContainerProps {
    left: number;
    top: number;
    theme: ThemeContextData;
}

export const ResizableContainer = styled(ResizableBox)<ResizableContainerProps>`
    user-select: none;

    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;

    border: 2px dashed ${props => props.theme.elementResizeDecorator};
    
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

    border: 2px dashed ${props => props.theme.elementDragDecorator};
    
    &.react-draggable-dragging {
        cursor: grabbing;
        border-radius: ${props => props.theme.elementDragRadius}px;
        opacity: ${props => props.theme.elementDragOpacity};
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

    border: 2px solid transparent;

    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;
