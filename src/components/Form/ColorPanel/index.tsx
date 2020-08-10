import React, { useState, useEffect, createRef, MouseEvent, ChangeEvent } from 'react';

import Container from './styles';

import Spinner from '../Spinner';

import {
    HSB,
    RGB,
    getColorFromString,
    HSBtoHEX,
    HSBtoRGB,
    RGBtoHSB,
    HEXtoHSB,
    HEXtoRGB,
    RGBtoHEX
} from '../../../utils/color';

interface ColorPanelProps {
    color: string;
    oldColor: string;
    changeColor: (newColor: string) => void;
}

interface PickerState {
    livePreview: 'none' | 'rgb' | 'hsb' | 'hex';
    rgb: RGB;
    hsb: HSB;
    hex: string;
    displayColor: string;
};

const ColorPanel: React.FC<ColorPanelProps> = ({ color, oldColor, changeColor }) => {
    const currentColor = getColorFromString(oldColor);
    const [pickerState, setPickerState] = useState<PickerState>({
        livePreview: 'none',
        rgb: HSBtoRGB(getColorFromString(color)),
        hsb: getColorFromString(color),
        hex: HSBtoHEX(getColorFromString(color)),
        displayColor: color
    });
    // hue drag
    const hueRef = createRef<HTMLDivElement>();
    // saturation/bright drag
    const colorBoxRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if (pickerState.livePreview === 'none') {
            changeColor(`#${pickerState.hex}`);
        }
    }, [pickerState]);

    function handleHueMouseDown(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        if (!hueRef.current) {
            return;
        }
        const rc = hueRef.current.getBoundingClientRect();

        const applyHue = (y: number): void => {
            const posY = y - rc.top;
            const hue = Math.min(360, Math.max(0, (150 - posY) / 150 * 360));
            setPickerState((prevState) => {
                const hsb = { h: hue, s: prevState.hsb.s, b: prevState.hsb.b };
                const hex = HSBtoHEX(hsb);
                return {
                    livePreview: 'hsb',
                    hsb,
                    hex,
                    rgb: HSBtoRGB(hsb),
                    displayColor: `#${hex}`
                };
            });
        };

        applyHue(e.pageY);
        const handleHueMouseMove = (evt: globalThis.MouseEvent) => {
            applyHue(evt.pageY);
        };
        const handleHueMouseUp = () => {
            document.removeEventListener('mouseup', handleHueMouseUp);
            document.removeEventListener('mousemove', handleHueMouseMove);
            setPickerState((prevState) => {
                return {
                    ...prevState,
                    livePreview: 'none'
                };
            });
        };
        document.addEventListener('mouseup', handleHueMouseUp);
        document.addEventListener('mousemove', handleHueMouseMove);
    }

    function handleColorBoxMouseDown(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        if (!colorBoxRef.current) {
            return;
        }
        const rc = colorBoxRef.current.getBoundingClientRect();

        const applySB = (x: number, y: number): void => {
            const posY = y - rc.top;
            const posX = x - rc.left;
            const sat = Math.min(100, Math.max(0, posX * 100 / 150));
            const bri = Math.min(100, Math.max(0, 100 - posY * 100 / 150));
            setPickerState((prevState) => {
                const hsb = { h: prevState.hsb.h, s: sat, b: bri };
                const hex = HSBtoHEX({ h: prevState.hsb.h, s: sat, b: bri });
                return {
                    livePreview: 'hsb',
                    hsb,
                    rgb: HSBtoRGB({ h: prevState.hsb.h, s: sat, b: bri }),
                    hex,
                    displayColor: `#${hex}`
                };
            });
        };

        applySB(e.pageX, e.pageY);

        const handleColorBoxMouseUp = () => {
            document.removeEventListener('mouseup', handleColorBoxMouseUp);
            document.removeEventListener('mousemove', handleColorBoxMouseMove);
            setPickerState((prevState) => {
                return {
                    ...prevState,
                    livePreview: 'none'
                };
            });
        };
        const handleColorBoxMouseMove = (e: globalThis.MouseEvent) => {
            applySB(e.pageX, e.pageY);
        };
        document.addEventListener('mouseup', handleColorBoxMouseUp);
        document.addEventListener('mousemove', handleColorBoxMouseMove);
    }

    function handleCurrentColorClick() {
        const hex = HSBtoHEX(currentColor);
        setPickerState({
            livePreview: 'none',
            rgb: HSBtoRGB(currentColor),
            hsb: currentColor,
            hex,
            displayColor: `#${hex}`
        });
    }

    function handleHexColorChange(e: ChangeEvent<HTMLInputElement>) {
        const hex = e.target.value;
        setPickerState({
            livePreview: 'hex',
            rgb: HEXtoRGB(hex),
            hsb: HEXtoHSB(hex),
            hex,
            displayColor: `#${hex}`
        });
    }

    function handleHexBlur() {
        setPickerState((prevState) => {
            return {
                ...prevState,
                livePreview: 'none'
            };
        });
    }

    function handleRGBSpinnerChange(comp: 'r' | 'g' | 'b', value: number) {
        const rgb = { ...pickerState.rgb };
        if (comp === 'r') {
            rgb.r = Math.min(255, Math.max(0, value));
        } else if (comp === 'g') {
            rgb.g = Math.min(255, Math.max(0, value));
        } else if (comp === 'b') {
            rgb.b = Math.min(255, Math.max(0, value));
        }
        setPickerState({
            livePreview: 'rgb',
            rgb,
            hsb: RGBtoHSB(rgb),
            hex: RGBtoHEX(rgb),
            displayColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        });
    }

    function applyRgbColor() {
        setPickerState((prevState) => {
            return {
                ...prevState,
                livePreview: prevState.livePreview === 'rgb' ? 'none' : prevState.livePreview
            };
        });
    }

    function handleHSBSpinnerChange(comp: 'h' | 's' | 'b', value: number) {
        const hsb = { ...pickerState.hsb };
        if (comp === 'h') {
            hsb.h = Math.min(360, Math.max(0, value));
        } else if (comp === 's') {
            hsb.s = Math.min(100, Math.max(0, value));
        } else if (comp === 'b') {
            hsb.b = Math.min(100, Math.max(0, value));
        }
        setPickerState({
            livePreview: 'hsb',
            rgb: HSBtoRGB(hsb),
            hsb,
            hex: HSBtoHEX(hsb),
            displayColor: `#${HSBtoHEX(hsb)}`
        });
    }

    function applyHsbColor() {
        setPickerState((prevState) => {
            return {
                ...prevState,
                livePreview: prevState.livePreview === 'hsb' ? 'none' : prevState.livePreview
            };
        });
    }

    return (
        <Container className="colorpicker">
            <div
                className="colorpicker_color"
                style={{
                    backgroundColor: `#${HSBtoHEX({ h: pickerState.hsb.h, s: 100, b: 100 })}`
                }}
                ref={colorBoxRef}
                onMouseDown={handleColorBoxMouseDown}
            >
                <div className="overlay">
                    <div
                        className="select"
                        style={{
                            left: (150 * pickerState.hsb.s) / 100,
                            top: (150 * (100 - pickerState.hsb.b)) / 100
                        }}
                    />
                </div>
            </div>
            <div
                className="colorpicker_hue"
                ref={hueRef}
                onMouseDown={handleHueMouseDown}
            >
                <div
                    className="select"
                    style={{
                        top: (150 - (150 * pickerState.hsb.h) / 360)
                    }}
                />
            </div>
            <div
                className="colorpicker_new_color"
                style={{
                    backgroundColor: pickerState.displayColor
                }}
            />
            <div
                className="colorpicker_current_color"
                onClick={handleCurrentColorClick}
                style={{
                    backgroundColor: `#${HSBtoHEX(currentColor)}`
                }}
            />
            <div className="colorpicker_hex">
                <span>#</span>
                <input
                    type="text"
                    size={6}
                    maxLength={6}
                    value={pickerState.hex}
                    onChange={handleHexColorChange}
                    onBlur={handleHexBlur}
                />
            </div>
            <div className="colorpicker_rgb_r colorpicker_field">
                <span>R</span>
                <Spinner
                    min={0}
                    max={255}
                    value={pickerState.rgb.r}
                    onChange={(v) => handleRGBSpinnerChange('r', v)}
                    onInputBlur={applyRgbColor}
                    onDragStop={applyRgbColor}
                />
            </div>
            <div className="colorpicker_rgb_g colorpicker_field">
                <span>G</span>
                <Spinner
                    min={0}
                    max={255}
                    value={pickerState.rgb.g}
                    onChange={(v) => handleRGBSpinnerChange('g', v)}
                    onInputBlur={applyRgbColor}
                    onDragStop={applyRgbColor}
                />
            </div>
            <div className="colorpicker_rgb_b colorpicker_field">
                <span>B</span>
                <Spinner
                    min={0}
                    max={255}
                    value={pickerState.rgb.b}
                    onChange={(v) => handleRGBSpinnerChange('b', v)}
                    onInputBlur={applyRgbColor}
                    onDragStop={applyRgbColor}
                />
            </div>
            <div className="colorpicker_hsb_h colorpicker_field">
                <span>H</span>
                <Spinner
                    min={0}
                    max={360}
                    value={pickerState.hsb.h}
                    onChange={(v) => handleHSBSpinnerChange('h', v)}
                    onInputBlur={applyHsbColor}
                    onDragStop={applyHsbColor}
                />
            </div>
            <div className="colorpicker_hsb_s colorpicker_field">
                <span>S</span>
                <Spinner
                    min={0}
                    max={100}
                    value={pickerState.hsb.s}
                    onChange={(v) => handleHSBSpinnerChange('s', v)}
                    onInputBlur={applyHsbColor}
                    onDragStop={applyHsbColor}
                />
            </div>
            <div className="colorpicker_hsb_b colorpicker_field">
                <span>B</span>
                <Spinner
                    min={0}
                    max={100}
                    value={pickerState.hsb.b}
                    onChange={(v) => handleHSBSpinnerChange('b', v)}
                    onInputBlur={applyHsbColor}
                    onDragStop={applyHsbColor}
                />
            </div>
        </Container>
    );
};

export default ColorPanel;
