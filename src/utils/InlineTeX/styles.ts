import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface InlineMathProps {
    error: boolean;
}

export const InlineMath = styled.span<InlineMathProps>`
    color: #67e480;

    position: relative;

    ${props => props.error && css`
        color: #E26079;
    `}
`;

export const Popup = styled(animated.div)`
    position: absolute;
    left: 0;
    top: 100%;
    padding: 10px;
    width: 250px;

    background: #FFF;
    color: #222;

    display: flex;
    align-items: center;
    justify-content: center;
`;
