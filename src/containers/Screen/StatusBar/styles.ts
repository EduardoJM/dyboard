import styled from 'styled-components';
import { ThemeContextData } from '../../../contexts/theme';

interface ContainerProps {
    theme: ThemeContextData;
}

const Container = styled.div<ContainerProps>`
    user-select: none;

    height: 25px;
    padding: 0 10px;

    display: flex;
    flex-direction: row;

    overflow: hidden;

    background: ${props => props.theme.statusBarBg};
    color: ${props => props.theme.statusBarFg};

    > span {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 12px;

        > svg {
            margin-right: 5px;
        }
    }
`;

export default Container;
