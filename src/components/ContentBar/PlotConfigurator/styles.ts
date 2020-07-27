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
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    .react-resizable-handle {
        background: transparent;
        width: 100%;
        height: 5px;
        border-bottom: 1px solid #FFF;
        cursor: row-resize;
    }

    .list {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        
        background: #FFF;

        .list-item {
            background: #CCC;
            padding: 4px 8px;

            &.active {
                background: #FF0;
            }
        }
    }
`;

export const PlotsConfig = styled.div`
    flex: 1;
`;
