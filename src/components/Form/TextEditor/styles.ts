import styled from 'styled-components';
import { ThemeContextData } from '../../../contexts/theme';

interface ContainerProps {
    theme: ThemeContextData;
}

export const Container = styled.div<ContainerProps>`
    width: 100%;
    height: calc(100% - 10px);

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;

    background: ${props => props.theme.textEditorBg};
    border: 1px solid ${props => props.theme.textEditorBorder};
    padding: 10px;
    
    > .toolbar-container {
        border-bottom: 1px solid ${props => props.theme.textEditorSeparatorBorder};
    }

    .DraftEditor-root {
        height: 300px;

        overflow-x: hidden;
        overflow-y: auto;
    }
`;

export const ToolBar = styled.div<ContainerProps>`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;

    margin-bottom: 10px;

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
