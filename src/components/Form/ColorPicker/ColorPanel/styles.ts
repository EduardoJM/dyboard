import styled from 'styled-components';
import * as images from './styles.images';
import { ThemeContextData } from '../../../../contexts/theme';

export const Container = styled.div`
    width: 400px;
    height: 176px;

    position: relative;
    overflow: hidden;

    background: #15121e;
    color: #E1E1EA;

    .colorpicker_color {
        width: 150px;
        height: 150px;

        position: absolute;
        left: 14px;
        top: 13px;
        overflow: hidden;
        cursor: crosshair;

        .overlay {
            width: 150px;
            height: 150px;
                
            background: url(${images.overlay});

            .select {
                width: 11px;
                height: 11px;
                margin: -5px 0 0 -5px;

                position: absolute;

                background: url(${images.select});
            }
        }
    }

    .colorpicker_hue {
        position: absolute;
        top: 13px;
        left: 171px;
        
        width: 35px;
        height: 150px;

        cursor: n-resize;

        background: url(${images.hue}) no-repeat center;

        .select {
            position: absolute;
            left: 0;

            width: 35px;
            height: 9px;

            margin: -4px 0 0 0;

            background: url(${images.hueSelect});
        }
    }

    .colorpicker_new_color {
        width: 72px;
        height: 30px;

        position: absolute;
        left: 213px;
        top: 13px;
    }

    .colorpicker_current_color {
        width: 72px;
        height: 30px;

        position: absolute;
        left: 302px;
        top: 13px;
    }

    .colorpicker_hex {
        position: absolute;
        left: 212px;
        top: 142px;

        width: 72px;
        height: 22px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        > span {
            padding: 0 5px;
        }

        > input {
            flex: 1;
            width: 10px;

            background: #201b2d;
            color: #E1E1EA;
            border: none;
            outline: none;
        }
    }

    .colorpicker_field {
        position: absolute;

        width: 82px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > span {
            padding: 0 5px;
        }

        > .spinner {
            flex: 1;
        }
    }

    .colorpicker_rgb_r {
        top: 52px;
        left: 212px;
    }

    .colorpicker_rgb_g {
        top: 82px;
        left: 212px;
    }

    .colorpicker_rgb_b {
        top: 112px;
        left: 212px;
    }

    .colorpicker_hsb_h {
        top: 52px;
        left: 302px;
    }

    .colorpicker_hsb_s {
        top: 82px;
        left: 302px;
    }

    .colorpicker_hsb_b {
        top: 112px;
        left: 302px;
    }
`;

interface SpinnerContainerProps {
    theme: ThemeContextData;
}

export const SpinnerContainer = styled.div<SpinnerContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: stretch;

    height: 25px;

    overflow: hidden;

    background: ${props => props.theme.spinnerBg};
    color: ${props => props.theme.spinnerFg};

    > input[type=text] {
        width: 0;
        flex: 1;

        background: transparent;
        border-color: transparent;
        outline: none;
        color: ${props => props.theme.spinnerFg};
    }

    .buttons {
        width: 20px;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: stretch;

        cursor: n-resize;

        background: ${props => props.theme.spinnerButtonsBg};
        color: ${props => props.theme.spinnerButtonsFg};

        .up-button, .down-button {
            flex: 0 0 50%;
            overflow: hidden;

            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;
