import React, { useState } from 'react';
import { LineStyle } from 'jplot';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Scope } from '@unform/core';
import * as Yup from 'yup';

import ColorPicker from '../../../Form/ColorPicker';
import Spinner from '../../../Form/Spinner';
import Slider from '../../../Form/Slider';
import OptionPicker from '../../../Form/OptionPicker';

import Container from './styles';

export const validationSchema = Yup.object().shape({
    color: Yup.string(),
    opacity: Yup.number(),
    type: Yup.string().oneOf(['dash', 'solid']),
    lineWidth: Yup.number(),
    lineCap: Yup.string().oneOf(['butt', 'square', 'round']),
    lineJoin: Yup.string().oneOf(['bevel', 'miter', 'round']),
    miterLimit: Yup.number(),
    dashSize: Yup.number(),
    dashDistance: Yup.number()
});

interface LineStyleWidgetProps {
    name: string;
    text: string;
    style: LineStyle;
}

const LineStyleWidget: React.FC<LineStyleWidgetProps> = ({
    name,
    text,
    style
}) => {
    const [propsVisible, setPropsVisible] = useState(false);
    const { t } = useTranslation('jplot');

    function handleCaptionClick() {
        setPropsVisible(!propsVisible);
    }

    return (
        <Container className="config line-style">
            <Scope path={name}>
                <span onClick={handleCaptionClick}>
                    {propsVisible
                        ? <MdKeyboardArrowDown />
                        : <MdKeyboardArrowRight />}
                    {text}
                </span>
                <div className={`config-content${propsVisible ? ' show' : ' hide'}`}>
                    <ColorPicker
                        name="color"
                        text={t('widgets.lineStyle.color')}
                        color={`rgb(${style.color.r}, ${style.color.g}, ${style.color.b})`}
                    />
                    <Spinner
                        name="opacity"
                        text={t('widgets.lineStyle.opacity')}
                        initialValue={Math.floor(style.opacity * 100)}
                        min={0}
                        max={100}
                        transform={100}
                    />
                    <OptionPicker
                        name="type"
                        text={t('widgets.lineStyle.type')}
                        options={[
                            { value: 'dash', label: t('widgets.lineStyle.typeDash') },
                            { value: 'solid', label: t('widgets.lineStyle.typeSolid') }
                        ]}
                        initialValue={style.type}
                    />
                    <Slider
                        name="lineWidth"
                        text={t('widgets.lineStyle.lineWidth')}
                        min={1}
                        max={50}
                        initialValue={style.lineWidth}
                    />
                    <OptionPicker
                        name="lineCap"
                        text={t('widgets.lineStyle.lineCap')}
                        options={[
                            { value: 'butt', label: t('widgets.lineStyle.lineCapButt') },
                            { value: 'square', label: t('widgets.lineStyle.lineCapSquare') },
                            { value: 'round', label: t('widgets.lineStyle.lineCapRound') }
                        ]}
                        initialValue={style.lineCap}
                    />
                    <OptionPicker
                        name="lineJoin"
                        text={t('widgets.lineStyle.lineJoin')}
                        options={[
                            { value: 'bevel', label: t('widgets.lineStyle.lineJoinBevel') },
                            { value: 'miter', label: t('widgets.lineStyle.lineJoinMiter') },
                            { value: 'round', label: t('widgets.lineStyle.lineJoinRound') }
                        ]}
                        initialValue={style.lineJoin}
                    />
                    <Slider
                        name="miterLimit"
                        text={t('widgets.lineStyle.miterLimit')}
                        min={0}
                        max={100}
                        initialValue={style.miterLimit}
                    />
                    <Slider
                        name="dashSize"
                        text={t('widgets.lineStyle.dashSize')}
                        min={0}
                        max={100}
                        initialValue={style.dashSize}
                    />
                    <Slider
                        name="dashDistance"
                        text={t('widgets.lineStyle.dashDistance')}
                        min={0}
                        max={100}
                        initialValue={style.dashDistance}
                    />
                </div>
            </Scope>
        </Container>
    );
};

export default LineStyleWidget;
