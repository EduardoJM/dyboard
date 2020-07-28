import React, { useState, useEffect, createRef, MouseEvent, ChangeEvent } from 'react';

import Container from './styles';

import {
    HSB,
    RGB,
    getColorFromString,
    HSBtoHEX,
    HSBtoRGB,
    RGBtoHSB,
    HEXtoHSB
} from '../../../core/color';

interface ColorPanelProps {
    color: string;
    oldColor: string;
    changeColor: (newColor: string) => void;
}

const ColorPanel: React.FC<ColorPanelProps> = ({ color, oldColor, changeColor }) => {
    const currentColor = getColorFromString(oldColor);
    // color states
    const [newColor, setNewColor] = useState<HSB>(getColorFromString(color));
    const [rgbColor, setRgbColor] = useState<RGB>({ r: 0, g: 0, b: 0 });
    const [hexNewColor, setHexNewColor] = useState('');

    // hue drag
    const hueRef = createRef<HTMLDivElement>();
    const [hueDown, setHueDown] = useState(false);
    const [hueDragging, setHueDragging] = useState(0);
    // saturation/bright drag
    const colorBoxRef = createRef<HTMLDivElement>();
    const [colorBoxDown, setColorBoxDown] = useState(false);
    const [brightDragging, setBrightDragging] = useState(0);
    const [saturationDragging, setSaturationDragging] = useState(0);

    function setHueFromMouse(y: number, changeColor?: boolean) {
        if (!hueRef.current) {
            return;
        }
        const rc = hueRef.current.getBoundingClientRect();
        const posY = y - rc.top;
        const hue = Math.min(360, Math.max(0, (150 - posY) / 150 * 360));
        setHueDragging(Math.round(hue));
        if (changeColor) {
            setNewColor({
                ...newColor,
                h: Math.round(hue)
            });
        }
    }

    function handleHueMouseDown(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        if (!hueRef.current) {
            return;
        }
        setHueDown(true);
        setHueFromMouse(e.pageY);
    }

    function handleHueMouseUp(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        setHueDown(false);
        setHueFromMouse(e.pageY, true);
    }

    function handleHueMouseMove(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        if (!hueRef.current || !hueDown) {
            return;
        }
        setHueFromMouse(e.pageY);
    }

    function setBSFromMouse(x: number, y: number, changeColor?: boolean) {
        if (!colorBoxRef.current) {
            return;
        }
        const rc = colorBoxRef.current.getBoundingClientRect();
        const posY = y - rc.top;
        const posX = x - rc.left;
        const sat = Math.min(100, Math.max(0, posX * 100 / 150));
        const bri = Math.min(100, Math.max(0, 100 - posY * 100 / 150));
        setBrightDragging(Math.round(bri));
        setSaturationDragging(Math.round(sat));
        if (changeColor) {
            setNewColor({
                ...newColor,
                s: Math.round(sat),
                b: Math.round(bri)
            });
        }
    }

    function handleColorBoxMouseDown(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        if (!colorBoxRef.current) {
            return;
        }
        setColorBoxDown(true);
        setBSFromMouse(e.pageX, e.pageY);
    }

    function handleColorBoxMouseUp(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        setColorBoxDown(false);
        setBSFromMouse(e.pageX, e.pageY, true);
    }

    function handleColorBoxMouseMove(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        if (!colorBoxRef.current || !colorBoxDown) {
            return;
        }
        setBSFromMouse(e.pageX, e.pageY);
    }

    function handleCurrentColorClick() {
        setNewColor(currentColor);
    }

    useEffect(() => {
        const newColorTemp = {
            h: hueDown ? hueDragging : newColor.h,
            s: colorBoxDown ? saturationDragging : newColor.s,
            b: colorBoxDown ? brightDragging : newColor.b
        };
        const hex = HSBtoHEX(newColorTemp);
        setHexNewColor(hex);
        setRgbColor(HSBtoRGB(newColorTemp));
        changeColor(`#${hex}`);
    }, [newColor, hueDown, hueDragging, colorBoxDown, saturationDragging, brightDragging]);

    const displayNewColor = {
        h: hueDown ? hueDragging : newColor.h,
        s: colorBoxDown ? saturationDragging : newColor.s,
        b: colorBoxDown ? brightDragging : newColor.b
    };

    function handleHexColorChange(e: ChangeEvent<HTMLInputElement>) {
        const hex = e.target.value;
        setNewColor(HEXtoHSB(hex));
    }

    function handleRgbColorChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const rgb = { ...rgbColor };
        if (name === 'r') {
            rgb.r = Math.min(255, Math.max(0, parseInt(value, 10)));
        } else if (name === 'g') {
            rgb.g = Math.min(255, Math.max(0, parseInt(value, 10)));
        } else if (name === 'b') {
            rgb.b = Math.min(255, Math.max(0, parseInt(value, 10)));
        } else {
            return;
        }
        setNewColor(RGBtoHSB(rgb));
    }

    function handleHsbColorChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const hsb = { ...newColor };
        if (name === 'h') {
            hsb.h = Math.min(360, Math.max(0, parseInt(value, 10)));
        } else if (name === 's') {
            hsb.s = Math.min(100, Math.max(0, parseInt(value, 10)));
        } else if (name === 'b') {
            hsb.b = Math.min(100, Math.max(0, parseInt(value, 10)));
        } else {
            return;
        }
        setNewColor(hsb);
    }

    return (
        <Container className="colorpicker">
            <div
                className="colorpicker_color"
                style={{
                    backgroundColor: `#${HSBtoHEX({ h: displayNewColor.h, s: 100, b: 100 })}`
                }}
                ref={colorBoxRef}
                onMouseDown={handleColorBoxMouseDown}
                onMouseUp={handleColorBoxMouseUp}
                onMouseMove={handleColorBoxMouseMove}
            >
                <div className="overlay">
                    <div
                        className="select"
                        style={{
                            left: (150 * displayNewColor.s) / 100,
                            top: (150 * (100 - displayNewColor.b)) / 100
                        }}
                    />
                </div>
            </div>
            <div
                className="colorpicker_hue"
                ref={hueRef}
                onMouseDown={handleHueMouseDown}
                onMouseMove={handleHueMouseMove}
                onMouseUp={handleHueMouseUp}
            >
                <div
                    className="select"
                    style={{
                        top: (150 - (150 * displayNewColor.h) / 360)
                    }}
                />
            </div>
            <div
                className="colorpicker_new_color"
                style={{
                    backgroundColor: `#${hexNewColor}`
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
                    value={hexNewColor}
                    onChange={handleHexColorChange}
                />
            </div>
            <div className="colorpicker_rgb_r colorpicker_field">
                <span>R</span>
                <input
                    type="text"
                    name="r"
                    maxLength={3}
                    value={rgbColor.r}
                    onChange={handleRgbColorChange}
                />
            </div>
            <div className="colorpicker_rgb_g colorpicker_field">
                <span>G</span>
                <input
                    type="text"
                    name="g"
                    maxLength={3}
                    value={rgbColor.g}
                    onChange={handleRgbColorChange}
                />
            </div>
            <div className="colorpicker_rgb_b colorpicker_field">
                <span>B</span>
                <input
                    type="text"
                    name="b"
                    maxLength={3}
                    value={rgbColor.b}
                    onChange={handleRgbColorChange}
                />
            </div>
            <div className="colorpicker_hsb_h colorpicker_field">
                <span>H</span>
                <input
                    type="text"
                    name="h"
                    maxLength={3}
                    value={displayNewColor.h}
                    onChange={handleHsbColorChange}
                />
            </div>
            <div className="colorpicker_hsb_s colorpicker_field">
                <span>S</span>
                <input
                    type="text"
                    name="s"
                    maxLength={3}
                    value={displayNewColor.s}
                    onChange={handleHsbColorChange}
                />
            </div>
            <div className="colorpicker_hsb_b colorpicker_field">
                <span>B</span>
                <input
                    type="text"
                    name="b"
                    maxLength={3}
                    value={displayNewColor.b}
                    onChange={handleHsbColorChange}
                />
            </div>
        </Container>
    );
};

export default ColorPanel;
