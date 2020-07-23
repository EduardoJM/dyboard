import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import { ThemeContextData } from '../../contexts/theme';

interface ContainerProps {
    theme: ThemeContextData;
}

export const Container = styled.div<ContainerProps>`
    width: 50px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    position: relative;

    background: ${props => props.theme.toolBarBg};
    color: ${props => props.theme.toolBarFg};
`;

export const Animation = styled(animated.div)`
    position: absolue;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

interface ButtonProps {
    theme: ThemeContextData;
    current: boolean;
}

export const Button = styled.div<ButtonProps>`
    width: 50px;
    height: 50px;
    padding: 5px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    overflow: hidden;

    position: relative;

    color: ${props => props.theme.toolBarFg};
    border-left: 2px solid transparent;
    transition: all 0.3s;

    &:hover {
        color: ${props => props.theme.toolBarFgActive};
    }

    ${props => props.current && css`
        border-color: ${props => props.theme.toolBarBorderActive};
        color: ${props => props.theme.toolBarFgActive};
    `}

    .deep {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 15px;
        height: 15px;
        transform: rotate(45deg) translateX(10px);
        
        background: ${props => props.theme.toolBarDeep};
    }
`;
