import styled, { css } from 'styled-components';
import { ThemeContextData } from '../contexts/theme';

interface ToolBarButtonProps {
    theme: ThemeContextData;
    current: boolean;
    markerSide?: 'left' | 'right';
}

export const ToolBarButton = styled.div<ToolBarButtonProps>`
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
    ${props => props.markerSide === 'right' && css`
        border-right: 2px solid transparent;
    `}
    ${props => props.markerSide !== 'right' && css`
        border-left: 2px solid transparent;
    `}
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
