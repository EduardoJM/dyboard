import styled, { css } from 'styled-components';
import { ThemeContextData } from '../../contexts/theme';

interface ContainerProps {
    catching: boolean;
    theme: ThemeContextData;
}

const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.bg};
    color: ${props => props.theme.fg};
    flex: 1;
    overflow: hidden;
    position: relative;
    ${(props) => props.catching && css`
        cursor: crosshair;
    `}
`;

export default Container;
