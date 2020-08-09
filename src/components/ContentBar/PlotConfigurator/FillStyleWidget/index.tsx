import React, { useState } from 'react';
import { FillStyle, SolidFill, PatternLine, LineStyle, Color } from 'jplot';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

import ColorPicker from '../../../Form/ColorPicker';
import Spinner from '../../../Form/Spinner';
import Slider from '../../../Form/Slider';
import OptionPicker from '../../../Form/OptionPicker';
import LineStyleWidget from '../LineStyleWidget';

import Container from './styles';

interface FillStyleWidgetProps {
    text: string;
    style: FillStyle;
    setStyle: (newStyle: FillStyle) => void;
}

const FillStyleWidget: React.FC<FillStyleWidgetProps> = ({
    text,
    style,
    setStyle
}) => {
    const [propsVisible, setPropsVisible] = useState(false);
    // TODO: add i18next translation support

    type FillType = 'solid' | 'linePattern' | 'none';
    const [fillType, setFillType] = useState<FillType>(() => {
        if (style instanceof SolidFill) {
            return 'solid';
        } else if (style instanceof PatternLine) {
            return 'linePattern';
        }
        setStyle(new SolidFill());
        return 'none';
    });
    const [opacity, setOpacity] = useState<number>(() => {
        if (style instanceof SolidFill) {
            return Math.floor(style.opacity * 100);
        } else if (style instanceof PatternLine) {
            return Math.floor(style.opacity * 100);
        }
        setStyle(new SolidFill());
        return 100;
    });
    const [patternSize, setPatternSize] = useState<number>(() => {
        if (style instanceof PatternLine) {
            return style.patternSize;
        }
        return 0;
    });

    function handleFillTypeChange(value: string) {
        if (value === 'solid') {
            setFillType(value);
            setStyle(new SolidFill());
        } else if (value === 'linePattern') {
            setFillType(value);
            setStyle(new PatternLine());
        }
    }

    function handleApplyColor(newColor: string) {
        if (style instanceof SolidFill) {
            style.color = Color.fromString(newColor);
            setStyle(style);
        } else if (style instanceof PatternLine) {
            style.baseColor = Color.fromString(newColor);
            setStyle(style);
        }
    }

    function handleApplyOpacity(newOpacity: number) {
        if (style instanceof SolidFill ||
            style instanceof PatternLine) {
            style.opacity = newOpacity / 100;
            setStyle(style);
        }
    }

    function handleApplyPatternSize(newSize: number) {
        if (!(style instanceof PatternLine)) {
            return;
        }
        style.patternSize = newSize;
        setStyle(style);
    }

    function handleApplyLineStyle(newLineStyle: LineStyle) {
        if (!(style instanceof PatternLine)) {
            return;
        }
        style.lineStyle = newLineStyle;
        setStyle(style);
    }

    function handleCaptionClick() {
        setPropsVisible(!propsVisible);
    }

    return (
        <Container className="config line-style">
            <span onClick={handleCaptionClick}>
                {propsVisible
                    ? <MdKeyboardArrowDown />
                    : <MdKeyboardArrowRight />}
                {text}
            </span>
            {propsVisible && (
                <div className="config-content">
                    <OptionPicker
                        options={[
                            { value: 'solid', label: 'Solido' },
                            { value: 'linePattern', label: 'Padrão de linhas' }
                        ]}
                        onChange={handleFillTypeChange}
                        value={fillType}
                        text="Estilo"
                    />
                    {fillType === 'solid' && style instanceof SolidFill && (
                        <>
                            <ColorPicker
                                text="Color"
                                color={`rgb(${style.color.r}, ${style.color.g}, ${style.color.b})`}
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
                        </>
                    )}
                    {fillType === 'linePattern' && style instanceof PatternLine && (
                        <>
                            <ColorPicker
                                text="Color"
                                color={`rgb(${style.baseColor.r}, ${style.baseColor.g}, ${style.baseColor.b})`}
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
                    )}
                </div>
            )}
        </Container>
    );
};

export default FillStyleWidget;
