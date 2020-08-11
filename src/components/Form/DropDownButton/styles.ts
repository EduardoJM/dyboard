import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
    display: inline-block;
    position: relative;
    overflow: visible;

    span {
        cursor: pointer;
    }
`;

export const DropDownContainer = styled(animated.div)`
    position: absolute;
    left: 0;
    top: 100%;

    z-index: 200;

    outline: none;

    width: 250px;

    background: #FFF;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;
