import styled from 'styled-components';

import { ThemeContextData } from '../../../contexts/theme';

export const InputContainer = styled.div`
    margin-bottom: 10px;
`;

interface ContainerProps {
    theme: ThemeContextData;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: stretch;

    height: 25px;

    overflow: hidden;

    background: ${props => props.theme.spinnerBg};
    color: ${props => props.theme.spinnerFg};

    > input[type=text] {
        width: 0;
        flex: 1;

        background: transparent;
        border-color: transparent;
        outline: none;
        color: ${props => props.theme.spinnerFg};
    }

    .buttons {
        width: 20px;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: stretch;

        cursor: n-resize;

        background: ${props => props.theme.spinnerButtonsBg};
        color: ${props => props.theme.spinnerButtonsFg};

        .up-button, .down-button {
            flex: 0 0 50%;
            overflow: hidden;

            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;
