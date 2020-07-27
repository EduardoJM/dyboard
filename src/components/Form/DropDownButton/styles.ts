import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.ul`
    display: inline-block;
    list-style-type: none;
    position: relative;
    overflow: visible;

    > li {
        outline: none;
    }
`;

export const DropDownContainer = styled(animated.ul)`
    position: absolute;
    left: 0;
    top: 100%;

    z-index: 200;

    outline: none;

    list-style-type: none;

    width: 200px;
`;
