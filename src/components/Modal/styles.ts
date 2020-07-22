import styled from 'styled-components';
import { animated } from 'react-spring';

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

export const Dialog = styled(animated.div)`
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

    background: #000;
    border: 1px solid #333;
`;

export const Header = styled.div`
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

export const HeaderButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;

    &:hover {
        background: red;
        color: #FFF;
    }
`;

export const Content = styled.div`
    flex: 1;
`;
