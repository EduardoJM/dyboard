import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
    width: 50px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    position: relative;
`;

export const Animation = styled(animated.div)`
    position: absolue;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

export const Button = styled.div`
    width: 50px;
    height: 50px;
    padding: 5px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    overflow: hidden;

    position: relative;

    .deep {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 15px;
        height: 15px;
        transform: rotate(45deg) translateX(10px);
        
        background: rgba(255, 255, 255, 0.4);
    }
`;
