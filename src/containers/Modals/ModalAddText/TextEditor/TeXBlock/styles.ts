import styled from 'styled-components';
import { animated } from 'react-spring';
import { ThemeContextData } from '../../../../../contexts/theme';

interface EditPanelProps {
    theme: ThemeContextData;
}

export const EditPanel = styled(animated.div)<EditPanelProps>`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    width: 90%;
    margin: 0 auto;

    background: ${props => props.theme.textEditorEditPanelBg};
    color: ${props => props.theme.textEditorEditPanelFg};
    padding: 10px;
    border-radius: ${props => props.theme.textEditorEditPanelRadius}px;

    textarea {
        flex: 1;
        resize: none;
        background: #FFF;
        border: none;
        outline: none;
        padding: 10px;
    }
    
    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 10px;

        button {
            margin: 5px;
            padding: 4px 8px;
            background-color: ${props => props.theme.textEditorEditPanelButtonBg};
            color: ${props => props.theme.textEditorEditPanelButtonFg};
            border: 1px solid ${props => props.theme.textEditorEditPanelButtonBorder};
            cursor: pointer;

            transition: all 0.3s;

            &:hover {
                background-color: ${props => props.theme.textEditorEditPanelButtonHoverBg};
                color: ${props => props.theme.textEditorEditPanelButtonHoverFg};
                border: 1px solid ${props => props.theme.textEditorEditPanelButtonHoverBorder};
            }
        }
    }
`;
