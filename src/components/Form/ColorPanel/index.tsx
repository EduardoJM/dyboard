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

// TODO: recreate some parts of this component

const ColorPanel: React.FC<ColorPanelProps> = ({ color, oldColor, changeColor }) => {
    const currentColor = getColorFromString(oldColor);
    // color states
    const [newColor, setNewColor] = useState<HSB>(getColorFromString(color));
    const [rgbColor, setRgbColor] = useState<RGB>({ r: 0, g: 0, b: 0 });
    const [displayColor, setDisplayColor] = useState('');
    const [hexNewColor, setHexNewColor] = useState('');

    // hue drag
    const hueRef = createRef<HTMLDivElement>();
    // saturation/bright drag
    const colorBoxRef = createRef<HTMLDivElement>();

    function setHueFromMouse(y: number, boxY: number) {
        const posY = y - boxY;
        const hue = Math.min(360, Math.max(0, (150 - posY) / 150 * 360));
        setNewColor({
            ...newColor,
            h: Math.round(hue)
        });
    }

    function handleHueMouseDown(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        if (!hueRef.current) {
            return;
        }
        const rc = hueRef.current.getBoundingClientRect();
        setHueFromMouse(e.pageY, rc.top);
        const boxY = rc.top;
        const handleHueMouseMove = (e: globalThis.MouseEvent) => {
            setHueFromMouse(e.pageY, boxY);
        };
        const handleHueMouseUp = () => {
            document.removeEventListener('mouseup', handleHueMouseUp);
            document.removeEventListener('mousemove', handleHueMouseMove);
        };
        document.addEventListener('mouseup', handleHueMouseUp);
        document.addEventListener('mousemove', handleHueMouseMove);
    }

    function setBSFromMouse(
        x: number,
        y: number,
        boxX: number,
        boxY: number
    ) {
        const posY = y - boxY;
        const posX = x - boxX;
        const sat = Math.min(100, Math.max(0, posX * 100 / 150));
        const bri = Math.min(100, Math.max(0, 100 - posY * 100 / 150));
        setNewColor({
            ...newColor,
            s: Math.round(sat),
            b: Math.round(bri)
        });
    }

    function handleColorBoxMouseDown(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        if (!colorBoxRef.current) {
            return;
        }
        const rc = colorBoxRef.current.getBoundingClientRect();
        setBSFromMouse(e.pageX, e.pageY, rc.left, rc.top);
        const boxX = rc.left;
        const boxY = rc.top;
        const handleColorBoxMouseUp = () => {
            document.removeEventListener('mouseup', handleColorBoxMouseUp);
            document.removeEventListener('mousemove', handleColorBoxMouseMove);
        };
        const handleColorBoxMouseMove = (e: globalThis.MouseEvent) => {
            setBSFromMouse(e.pageX, e.pageY, boxX, boxY);
        };
        document.addEventListener('mouseup', handleColorBoxMouseUp);
        document.addEventListener('mousemove', handleColorBoxMouseMove);
    }

    function handleCurrentColorClick() {
        setNewColor(currentColor);
    }

    useEffect(() => {
        const hex = HSBtoHEX(newColor);
        setHexNewColor(hex);
        setRgbColor(HSBtoRGB(newColor));
        const dHex = `#${hex}`;
        changeColor(dHex);
        setDisplayColor(dHex);
    }, [newColor]);

    function handleHexColorChange(e: ChangeEvent<HTMLInputElement>) {
        const hex = e.target.value;
        setNewColor(HEXtoHSB(hex));
    }

    function handleRgbColorChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const rgb = { ...rgbColor };
        if (name === 'r') {
            rgb.r = Math.min(255, Math.max(0, parseInt(value, 10)));
            if (Number.isNaN(rgb.r)) {
                rgb.r = 0;
            }
        } else if (name === 'g') {
            rgb.g = Math.min(255, Math.max(0, parseInt(value, 10)));
            if (Number.isNaN(rgb.g)) {
                rgb.g = 0;
            }
        } else if (name === 'b') {
            rgb.b = Math.min(255, Math.max(0, parseInt(value, 10)));
            if (Number.isNaN(rgb.b)) {
                rgb.b = 0;
            }
        } else {
            return;
        }
        setRgbColor(rgb);
        setDisplayColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    }

    function applyRgbColor() {
        setNewColor(RGBtoHSB(rgbColor));
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
                    backgroundColor: `#${HSBtoHEX({ h: newColor.h, s: 100, b: 100 })}`
                }}
                ref={colorBoxRef}
                onMouseDown={handleColorBoxMouseDown}
            >
                <div className="overlay">
                    <div
                        className="select"
                        style={{
                            left: (150 * newColor.s) / 100,
                            top: (150 * (100 - newColor.b)) / 100
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
                        top: (150 - (150 * newColor.h) / 360)
                    }}
                />
            </div>
            <div
                className="colorpicker_new_color"
                style={{
                    backgroundColor: displayColor
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
                    onBlur={applyRgbColor}
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
                    onBlur={applyRgbColor}
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
                    onBlur={applyRgbColor}
                />
            </div>
            <div className="colorpicker_hsb_h colorpicker_field">
                <span>H</span>
                <input
                    type="text"
                    name="h"
                    maxLength={3}
                    value={newColor.h}
                    onChange={handleHsbColorChange}
                />
            </div>
            <div className="colorpicker_hsb_s colorpicker_field">
                <span>S</span>
                <input
                    type="text"
                    name="s"
                    maxLength={3}
                    value={newColor.s}
                    onChange={handleHsbColorChange}
                />
            </div>
            <div className="colorpicker_hsb_b colorpicker_field">
                <span>B</span>
                <input
                    type="text"
                    name="b"
                    maxLength={3}
                    value={newColor.b}
                    onChange={handleHsbColorChange}
                />
            </div>
        </Container>
    );
};

export default ColorPanel;
