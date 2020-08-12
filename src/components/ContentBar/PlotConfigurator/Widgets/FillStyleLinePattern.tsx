import React from 'react';
import { PatternLine } from 'jplot';
import { useTranslation } from 'react-i18next';

import ColorPicker from '../../../Form/ColorPicker';
import Spinner from '../../../Form/Spinner';
import LineStyleWidget from './LineStyleWidget';

interface FillStyleLinePatternProps{
    style: PatternLine,
}

const FillStyleLinePattern: React.FC<FillStyleLinePatternProps> = ({
    style
}) => {
    const { t } = useTranslation('jplot');

    return (
        <>
            <ColorPicker
                name="baseColor"
                text={t('widgets.fillStyle.patternLine.baseColor')}
                color={`rgb(${style.baseColor.r}, ${style.baseColor.g}, ${style.baseColor.b})`}
            />
            <Spinner
                name="opacity"
                text={t('widgets.fillStyle.patternLine.opacity')}
                initialValue={Math.floor(style.opacity * 100)}
                min={0}
                max={100}
                transform={100}
            />
            <Spinner
                name="patternSize"
                text={t('widgets.fillStyle.patternLine.patternSize')}
                initialValue={style.patternSize}
                min={1}
                max={500}
            />
            <LineStyleWidget
                name="lineStyle"
                text={t('widgets.fillStyle.patternLine.patternLine')}
                style={style.lineStyle}
            />
        </>
    );
};

export default FillStyleLinePattern;
