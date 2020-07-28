import styled from 'styled-components';
import { ThemeContextData } from '../../../contexts/theme';

export const TextBlock = styled.div`
    padding: 5px;
`;

interface ContainerProps {
    pos: number;
    isMax: boolean;
    theme: ThemeContextData;
}

export const Container = styled.div<ContainerProps>`
    user-select: none;

    display: block;
    padding: 5px;
    padding-top: 15px;
    width: 100%;

    position: relative;

    .bar {
        height: 10px;
        background: ${props => props.theme.sliderBar};

        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 5px;
        width: calc(100% - 15px);

        border-radius: 5px;

        .bar-btn {
            width: 15px;
            height: 15px;

            border-radius: 5px;

            background: ${props => props.theme.sliderButton};

            cursor: pointer;

            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: ${props => props.isMax ? `calc(${props.pos}% - 10px)` : `${props.pos}%`};

            .popup {
                background: ${props => props.theme.sliderPopupBg};
                color: ${props => props.theme.sliderPopupFg};

                border-radius: 5px;

                padding: 5px;

                position: absolute;
                bottom: calc(100% + 10px);
                left: 50%;
                transform: translateX(-50%);
                z-index: 200;
            }
        }
    }
`;
