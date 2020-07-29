import styled from 'styled-components';
import { animated } from 'react-spring';
import { ThemeContextData } from '../../contexts/theme';

interface ContainerProps {
    theme: ThemeContextData;
}

export const Container = styled.div<ContainerProps>`
    width: 50px;
    min-width: 50px;
    max-width: 50px;
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
