import styled from 'styled-components';
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

    .heading {
        text-transform: uppercase;
        padding: 10px 5px;

        background: ${props => props.theme.contentBarPanelHeadingBg};
        color: ${props => props.theme.contentBarPanelHeadingFg}
    }
`;

export const PlotsList = styled.div<ThemedProps>`
    width: 100%;
    height: 250px;
    
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    .list {
        flex: 1;

        background: ${props => props.theme.contentBarListBg};
        color: ${props => props.theme.contentBarListFg};
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

export const ListToolButton = styled.span`
    padding: 5px;
    cursor: pointer;
    color: #E1E1E6;
`;

export const PlotsConfig = styled.div`
    overflow: hidden;

    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .editor {
        width: 250px;
        flex: 1;
    }

    .fit-center-text {
        flex: 1;

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .footer {
        padding: 5px;
        display: flex;
        justify-content: flex-end;

        button {
            cursor: pointer;
            background: transparent;
            border: none;
            outline: none;
            color: #E1E1E6;
        }
    }
`;
