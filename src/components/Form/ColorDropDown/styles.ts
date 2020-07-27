import styled from 'styled-components';
import { animated } from 'react-spring';
import * as images from './styles.images';

export const Container = styled.ul`
    display: block;
    list-style-type: none;
    position: relative;
    overflow: visible;
    padding: 10px 0;

    > li {
        outline: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        > .color-box {
            width: 24px;
            height: 24px;
        }
    }
`;

export const DropDownContainer = styled(animated.ul)`
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);

    z-index: 200;

    outline: none;

    list-style-type: none;

    width: 356px;
    height: 176px;

    .colorpicker {
        width: 356px;
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
            width: 60px;
            height: 30px;

            position: absolute;
            left: 213px;
            top: 13px;
        }

        .colorpicker_current_color {
            width: 60px;
            height: 30px;

            position: absolute;
            left: 283px;
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

            width: 62px;
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
            left: 282px;
        }

        .colorpicker_hsb_s {
            top: 82px;
            left: 282px;
        }

        .colorpicker_hsb_b {
            top: 112px;
            left: 282px;
        }

        .colorpicker_submit {
            width: 22px;
            height: 22px;

            display: flex;
            align-items: center;
            justify-content: center;

            position: absolute;
            left: 322px;
            top: 142px;
        }
    }
`;
