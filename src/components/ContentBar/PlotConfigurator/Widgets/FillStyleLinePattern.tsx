import React, { useState } from 'react';
import { PatternLine, LineStyle, Color } from 'jplot';

import ColorPicker from '../../../Form/ColorPicker';
import Spinner from '../../../Form/Spinner';
import LineStyleWidget from './LineStyleWidget';

interface FillStyleLinePatternProps{
    style: PatternLine,
    setStyle: (newStyle: PatternLine) => void;
}

const FillStyleLinePattern: React.FC<FillStyleLinePatternProps> = ({
    style,
    setStyle
}) => {
    const [color, setColor] =
        useState(`rgb(${style.baseColor.r}, ${style.baseColor.g}, ${style.baseColor.b})`);
    const [opacity, setOpacity] = useState(Math.floor(style.opacity * 100));
    const [patternSize, setPatternSize] = useState(style.patternSize);

    function handleApplyColor(newColor: string) {
        setColor(newColor);
        style.baseColor = Color.fromString(newColor);
        style.updatePattern();
        setStyle(style);
    }

    function handleApplyOpacity(newOpacity: number) {
        style.opacity = newOpacity / 100;
        style.updatePattern();
        setStyle(style);
    }

    function handleApplyPatternSize(newSize: number) {
        style.patternSize = newSize;
        style.updatePattern();
        setStyle(style);
    }

    function handleApplyLineStyle(newStyle: LineStyle) {
        style.lineStyle = newStyle;
        style.updatePattern();
        setStyle(style);
    }

    return (
        <>
            <ColorPicker
                text="Color"
                color={color}
                onSubmit={handleApplyColor}
            />
            <Spinner
                labeled
                text="Opacidade"
                value={opacity}
                min={0}
                max={100}
                onChange={setOpacity}
                onDragStop={handleApplyOpacity}
                onInputBlur={handleApplyOpacity}
            />
            <Spinner
                labeled
                text="Tamanho do Pattern"
                value={patternSize}
                min={1}
                max={500}
                onChange={setPatternSize}
                onDragStop={handleApplyPatternSize}
                onInputBlur={handleApplyPatternSize}
            />
            <LineStyleWidget
                text="Linha do Pattern"
                style={style.lineStyle}
                setStyle={handleApplyLineStyle}
            />
        </>
    );
};

export default FillStyleLinePattern;
