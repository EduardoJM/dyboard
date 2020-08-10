import React, { useState } from 'react';
import { FillStyle, SolidFill, PatternLine } from 'jplot';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import OptionPicker from '../../../Form/OptionPicker';

import FillStyleLinePattern from './FillStyleLinePattern';
import FillStyleSolid from './FillStyleSolid';

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
    const { t } = useTranslation('jplot');

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
                            { value: 'solid', label: t('widgets.fillStyle.typeSolid') },
                            { value: 'linePattern', label: t('widgets.fillStyle.typeLinePattern') }
                        ]}
                        onChange={handleFillTypeChange}
                        value={fillType}
                        text={t('widgets.fillStyle.type')}
                    />
                    {style instanceof PatternLine && (
                        <FillStyleLinePattern
                            style={style}
                            setStyle={setStyle}
                        />
                    )}
                    {style instanceof SolidFill && (
                        <FillStyleSolid
                            style={style}
                            setStyle={setStyle}
                        />
                    )}
                </div>
            )}
        </Container>
    );
};

export default FillStyleWidget;
