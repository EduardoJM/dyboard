import styled from 'styled-components';
import { animated } from 'react-spring';
import { ThemeContextData } from '../../contexts/theme';

export const Container = styled.div`
`;

export const Overlay = styled(animated.div)`
    position: absolute;
    z-index: 400;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    
    background: rgba(0, 0, 0, 0.5);
`;

interface DialogProps {
    theme: ThemeContextData;
}

export const Dialog = styled(animated.div)<DialogProps>`
    position: absolute;
    z-index: 405;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 500px;
    height: 500px;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    background: ${props => props.theme.modalBg};
    color: ${props => props.theme.modalFg};
    border: 1px solid ${props => props.theme.modalBorder};
`;

export const Header = styled.div`
    user-select: none;
    height: 34px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    .title {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const HeaderButton = styled.div<DialogProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;

    &:hover {
        background: ${props => props.theme.modalActiveButtonBg};
        color: ${props => props.theme.modalActiveButtonFg};
    }
`;

export const Content = styled.div`
    flex: 1;
`;
