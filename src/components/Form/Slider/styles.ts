import styled from 'styled-components';
import { ThemeContextData } from '../../../contexts/theme';

export const TextBlock = styled.div`
`;

interface ContainerProps {
    pos: number;
    isMax: boolean;
    theme: ThemeContextData;
}

export const Container = styled.div<ContainerProps>`
    user-select: none;

    display: block;
    padding-top: 15px;
    width: 100%;
    
    margin-bottom: 10px;

    position: relative;

    .bar {
        height: 10px;
        background: ${props => props.theme.sliderBar};

        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: calc(100% - 10px);

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
