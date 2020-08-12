import React, { useState } from 'react';
import { FillStyle, SolidFill, PatternLine } from 'jplot';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Scope } from '@unform/core';

import OptionPicker from '../../../Form/OptionPicker';

import FillStyleLinePattern from './FillStyleLinePattern';
import FillStyleSolid from './FillStyleSolid';

import Container from './styles';

interface FillStyleWidgetProps {
    name: string;
    text: string;
    initialStyle: FillStyle;
}

type FillType = 'solid' | 'linePattern' | 'none';

const FillStyleWidget: React.FC<FillStyleWidgetProps> = ({
    name,
    text,
    initialStyle
}) => {
    const [propsVisible, setPropsVisible] = useState(false);
    const [style, setStyle] = useState<FillStyle>(initialStyle);
    const [fillType, setFillType] = useState<FillType>(() => {
        if (style instanceof SolidFill) {
            return 'solid';
        } else if (style instanceof PatternLine) {
            return 'linePattern';
        }
        setStyle(new SolidFill());
        return 'none';
    });
    const { t } = useTranslation('jplot');

    function handleFillTypeChange(value: string) {
        if (value === 'solid') {
            setFillType(value);
            const style = new SolidFill();
            setStyle(style);
        } else if (value === 'linePattern') {
            setFillType(value);
            const style = new PatternLine();
            setStyle(style);
        }
    }

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
                    <OptionPicker
                        name="type"
                        options={[
                            { value: 'solid', label: t('widgets.fillStyle.typeSolid') },
                            { value: 'linePattern', label: t('widgets.fillStyle.typeLinePattern') }
                        ]}
                        initialValue={fillType}
                        onChange={handleFillTypeChange}
                        text={t('widgets.fillStyle.type')}
                    />
                    {style instanceof PatternLine && (
                        <FillStyleLinePattern style={style} />
                    )}
                    {style instanceof SolidFill && (
                        <FillStyleSolid style={style} />
                    )}
                </div>
            </Scope>
        </Container>
    );
};

export default FillStyleWidget;
