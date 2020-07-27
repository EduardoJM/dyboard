import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
    position: relative;
`;

export const DropDownContainer = styled(animated.div)`
    position: absolute;
    left: 0;
    top: 100%;

    outline: none;

    background: #F00;
`;
