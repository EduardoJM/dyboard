import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
import { ThemeContextData } from '../../../contexts/theme';

interface ThemedProps {
    theme: ThemeContextData;
}

export const Container = styled.div<ThemedProps>`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    .heading {
        text-transform: uppercase;
        padding: 10px 5px;

        background: ${props => props.theme.contentBarPanelHeadingBg};
        color: ${props => props.theme.contentBarPanelHeadingFg}
    }
`;

export const PlotsList = styled(ResizableBox)<ThemedProps>`
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
        
        background: ${props => props.theme.contentBarListBg};
        color: ${props => props.theme.contentBarListFg};

        .list-item {
            background: transparent;
            color: ${props => props.theme.contentBarListFg};
            transition: all ease 0.3s;
            padding: 4px 8px;

            &.active {
                background: #FF0;

                background: ${props => props.theme.contentBarListItemBg};
                color: ${props => props.theme.contentBarListItemFg};
            }
        }
    }

    .list-tools {
        padding: 5px 0;

        > ul {
            > li {
                padding: 5px;
                cursor: pointer;
                color: #E1E1E6;

                > ul {
                    cursor: default;

                    .add-dropdown-content {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: stretch;
                        justify-content: flex-start;
                    }
                }
            }
        }
    }
`;

export const PlotsConfig = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    .editor {
        padding: 10px;
        flex: 1;
    }
`;
