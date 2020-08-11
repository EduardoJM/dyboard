import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import { ThemeContextData } from '../../../contexts/theme';

interface ContainerProps {
    theme: ThemeContextData;
    downed: boolean;
}

export const Container = styled.div<ContainerProps>`
    display: inline-block;
    position: relative;
    overflow: visible;

    span {
        cursor: pointer;
        background-color: transparent;
        padding: 5px;
        transition: background-color 0.2s;

        ${props => props.downed && css`
            background-color: ${props => props.theme.dropDownMenuBg};
        `}
    }
`;

interface DropDownContainerProps {
    theme: ThemeContextData;
}

export const DropDownContainer = styled(animated.div)<DropDownContainerProps>`
    position: absolute;
    left: 0;
    top: 100%;

    z-index: 200;

    outline: none;

    width: 250px;

    background: ${props => props.theme.dropDownMenuBg};
    color: ${props => props.theme.dropDownMenuFg};

    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    button {
        background: transparent;
        border: none;
        outline: none;
        color: ${props => props.theme.dropDownMenuFg};
        transition: color 0.2s;

        text-align: left;
        padding: 5px;

        &:hover {
            color: ${props => props.theme.dropDownMenuFgHover};
        }
    }

    button + button{
        margin-top: 10px;
    }
`;
