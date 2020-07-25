import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
`;

export const PlotsList = styled(ResizableBox)`
    overflow-x: hidden;
    overflow-y: auto;

    width: 100%;

    .react-resizable-handle {
        background: transparent;
        width: 100%;
        height: 5px;
        border-bottom: 1px solid #FFF;
        cursor: row-resize;
    }
`;

export const PlotsConfig = styled.div`
    flex: 1;
`;
