import styled from 'styled-components';
import { ThemeContextData } from '../../../contexts/theme';

interface ContainerProps {
    theme: ThemeContextData;
}

const Container = styled.button<ContainerProps>`
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

export default Container;
