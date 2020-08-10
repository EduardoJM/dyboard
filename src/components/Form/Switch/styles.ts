import styled from 'styled-components';
import { animated } from 'react-spring';
import { ThemeContextData } from '../../../contexts/theme';

export const Container = styled.div`
    user-select: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;

    > span {
        flex: 1;
    }
`;

interface GrayBarProps {
    theme: ThemeContextData;
    checked: boolean;
}

export const GrayBar = styled.div<GrayBarProps>`
    width: 36px;
    height: 14px;

    border-radius: 7px;

    background-color: ${props => props.checked ? props.theme.switchCheckedBg : props.theme.switchBg};

    position: relative;
    transition: background-color ease 1s;
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
