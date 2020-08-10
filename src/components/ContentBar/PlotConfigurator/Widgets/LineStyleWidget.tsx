import React, { useState } from 'react';
import { LineStyle, Color } from 'jplot';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation('jplot');

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
                        text={t('widgets.lineStyle.color')}
                        color={color}
                        onSubmit={handleColorChange}
                    />
                    <Spinner
                        labeled
                        text={t('widgets.lineStyle.opacity')}
                        value={opacity}
                        min={0}
                        max={100}
                        onChange={setOpacity}
                        onDragStop={handleApplyOpacity}
                        onInputBlur={handleApplyOpacity}
                    />
                    <OptionPicker
                        text={t('widgets.lineStyle.type')}
                        options={[
                            { value: 'dash', label: t('widgets.lineStyle.typeDash') },
                            { value: 'solid', label: t('widgets.lineStyle.typeSolid') }
                        ]}
                        value={style.type}
                        onChange={handleApplyStyle}
                    />
                    <Slider
                        text={t('widgets.lineStyle.lineWidth')}
                        min={1}
                        max={50}
                        onValueChange={setLineWidth}
                        onDragStop={handleApplyLineWidth}
                        value={lineWidth}
                    />
                    <OptionPicker
                        text={t('widgets.lineStyle.lineCap')}
                        options={[
                            { value: 'butt', label: t('widgets.lineStyle.lineCapButt') },
                            { value: 'square', label: t('widgets.lineStyle.lineCapSquare') },
                            { value: 'round', label: t('widgets.lineStyle.lineCapRound') }
                        ]}
                        value={style.lineCap}
                        onChange={handleApplyCap}
                    />
                    <OptionPicker
                        text={t('widgets.lineStyle.lineJoin')}
                        options={[
                            { value: 'bevel', label: t('widgets.lineStyle.lineJoinBevel') },
                            { value: 'miter', label: t('widgets.lineStyle.lineJoinMiter') },
                            { value: 'round', label: t('widgets.lineStyle.lineJoinRound') }
                        ]}
                        value={style.lineJoin}
                        onChange={handleApplyJoin}
                    />
                    <Slider
                        text={t('widgets.lineStyle.miterLimit')}
                        min={0}
                        max={100}
                        onValueChange={setMiterLimit}
                        onDragStop={handleApplyMiterLimit}
                        value={miterLimit}
                    />
                    <Slider
                        text={t('widgets.lineStyle.dashSize')}
                        min={0}
                        max={100}
                        onValueChange={setDashSize}
                        onDragStop={handleApplyDashSize}
                        value={dashSize}
                    />
                    <Slider
                        text={t('widgets.lineStyle.dashDistance')}
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
