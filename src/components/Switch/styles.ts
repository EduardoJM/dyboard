import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
    user-select: none;
    cursor: pointer;

    padding: 5px;
    padding-right: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    > span {
        flex: 1;
    }
`;

export const GrayBar = styled.div`
    width: 36px;
    height: 14px;

    border-radius: 7px;

    background: #646464;

    position: relative;
`;

export const ColoredBar = styled(animated.div)`
    background: #58758d;

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    
    border-radius: 7px;
`;

export const Marker = styled(animated.div)`
    width: 20px;
    height: 20px;
    border-radius: 10px;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    transition: background-color ease 1s;
`;
