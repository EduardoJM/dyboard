import React, { useState } from 'react';
import { LineStyle, Color } from 'jplot';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

import ColorPicker from '../../../Form/ColorPicker';
import Spinner from '../../../Form/Spinner';
import Slider from '../../../Form/Slider';
import OptionPicker from '../../../Form/OptionPicker';

import Container from './styles';

interface LineStyleWidgetProps {
    text: string;
    style: LineStyle;
    setStyle: (newStyle: LineStyle) => void;
}

const LineStyleWidget: React.FC<LineStyleWidgetProps> = ({
    text,
    style,
    setStyle
}) => {
    const [propsVisible, setPropsVisible] = useState(false);

    // TODO: add i18next translation support
    const [color, setColor] = useState(`rgb(${style.color.r}, ${style.color.g}, ${style.color.b})`);
    const [opacity, setOpacity] = useState(Math.floor(style.opacity * 100));
    const [lineWidth, setLineWidth] = useState(style.lineWidth);
    const [miterLimit, setMiterLimit] = useState(style.miterLimit);
    const [dashSize, setDashSize] = useState(style.dashSize);
    const [dashDistance, setDashDistance] = useState(style.dashDistance);

    function handleColorChange(newColor: string) {
        setColor(newColor);
        style.color = Color.fromString(newColor);
        setStyle(style);
    }

    function handleApplyOpacity(newOpacity: number) {
        style.opacity = newOpacity / 100;
        setStyle(style);
    }

    function handleApplyStyle(newStyle: string) {
        if (newStyle === 'dash' || newStyle === 'solid') {
            style.type = newStyle;
            setStyle(style);
        }
    }

    function handleApplyLineWidth(newWidth: number) {
        style.lineWidth = newWidth;
        setStyle(style);
    }

    function handleApplyCap(newCap: string) {
        if (newCap === 'butt' || newCap === 'square' || newCap === 'round') {
            style.lineCap = newCap;
            setStyle(style);
        }
    }

    function handleApplyJoin(newJoin: string) {
        if (newJoin === 'round' || newJoin === 'bevel' || newJoin === 'miter') {
            style.lineJoin = newJoin;
            setStyle(style);
        }
    }

    function handleApplyMiterLimit(newLimit: number) {
        style.miterLimit = newLimit;
        setStyle(style);
    }

    function handleApplyDashSize(newSize: number) {
        style.dashSize = newSize;
        setStyle(style);
    }

    function handleApplyDashDistance(newDist: number) {
        style.dashDistance = newDist;
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
                    <ColorPicker
                        text="Color"
                        color={color}
                        onSubmit={handleColorChange}
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
                    <OptionPicker
                        text="Estilo"
                        options={[
                            { value: 'dash', label: 'Tracejado' },
                            { value: 'solid', label: 'Solido' }
                        ]}
                        value={style.type}
                        onChange={handleApplyStyle}
                    />
                    <Slider
                        text="Espessura"
                        min={1}
                        max={50}
                        onValueChange={setLineWidth}
                        onDragStop={handleApplyLineWidth}
                        value={lineWidth}
                    />
                    <OptionPicker
                        text="Cap"
                        options={[
                            { value: 'butt', label: 'Butt?' },
                            { value: 'square', label: 'Quadrado' },
                            { value: 'round', label: 'Arredondado' }
                        ]}
                        value={style.lineCap}
                        onChange={handleApplyCap}
                    />
                    <OptionPicker
                        text="Join"
                        options={[
                            { value: 'bevel', label: 'Elevado?' },
                            { value: 'miter', label: 'Miter?' },
                            { value: 'round', label: 'Arredondado' }
                        ]}
                        value={style.lineJoin}
                        onChange={handleApplyJoin}
                    />
                    <Slider
                        text="Limite de Miter"
                        min={0}
                        max={100}
                        onValueChange={setMiterLimit}
                        onDragStop={handleApplyMiterLimit}
                        value={miterLimit}
                    />
                    <Slider
                        text="Dash Size"
                        min={0}
                        max={100}
                        onValueChange={setDashSize}
                        onDragStop={handleApplyDashSize}
                        value={dashSize}
                    />
                    <Slider
                        text="Dash Distance"
                        min={0}
                        max={100}
                        onValueChange={setDashDistance}
                        onDragStop={handleApplyDashDistance}
                        value={dashDistance}
                    />
                </div>
            )}
        </Container>
    );
};

export default LineStyleWidget;
