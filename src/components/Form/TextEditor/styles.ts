import styled from 'styled-components';

import { ThemeContextData } from '../../../contexts/theme';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    padding: 5px;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;

    .DraftEditor-root {
        height: 300px;

        overflow-x: hidden;
        overflow-y: scroll;
    }
`;

interface ToolBarProps {
    theme: ThemeContextData;
}

export const ToolBar = styled.div<ToolBarProps>`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;

    background: ${props => props.theme.textEditorToolsBg};

    button {
        padding: 5px;
        font-size: 13px;

        margin-right: 5px;

        border: none;
        outline: none;
        background: transparent;
        
        cursor: pointer;

        color: ${props => props.theme.textEditorButtonFg};

        transition: all 0.3s;

        &:hover {
            color: ${props => props.theme.textEditorButtonHoverFg};
        }
    }
`;
