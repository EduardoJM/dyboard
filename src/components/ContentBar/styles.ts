import styled from 'styled-components';
import { animated } from 'react-spring';
import { ThemeContextData } from '../../contexts/theme';

export const Container = styled.div`
    width: 50px;

    position: relative;

    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;

    user-select: none;
`;

interface ThemedProps {
    theme: ThemeContextData;
}

export const Bar = styled.div<ThemedProps>`
    position: absolute;
    left: 0;
    top: 0;

    width: 50px;
    height: 100%;

    background: ${props => props.theme.contentBarBg};
    color: ${props => props.theme.contentBarFg};
`;

export const Content = styled(animated.div)<ThemedProps>`
    position: absolute;
    right: 50px;
    top: 0;

    width: 250px;
    height: 100%;

    background: ${props => props.theme.contentBarPanelBg};
    color: ${props => props.theme.contentBarPanelFg};
`;
