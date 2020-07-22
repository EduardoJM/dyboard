import styled, { css } from 'styled-components';

interface ContainerProps {
    catching: boolean;
}

const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 100%;
    background: #222;
    flex: 1;
    overflow: hidden;

    position: relative;

    ${(props) => props.catching && css`
        cursor: crosshair;
    `}
`;

export default Container;
