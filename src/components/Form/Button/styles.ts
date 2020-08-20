import styled from 'styled-components';
import { ThemeContextData } from '../../../contexts/theme';

interface ContainerProps {
    theme: ThemeContextData;
}

export const Container = styled.button<ContainerProps>`
    padding: 8px 20px;
    background-color: ${props => props.theme.buttonBg};
    color: ${props => props.theme.buttonFg};
    border: 1px solid ${props => props.theme.buttonBorder};
    outline: none;
    cursor: pointer;

    transition: all 0.3s;

    &:hover {
        background-color: ${props => props.theme.buttonHoverBg};
        color: ${props => props.theme.buttonHoverFg};
        border: 1px solid ${props => props.theme.buttonHoverBorder};
    }
`;

export const TransparentContainer = styled.button`
    padding: 8px 20px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
`;
