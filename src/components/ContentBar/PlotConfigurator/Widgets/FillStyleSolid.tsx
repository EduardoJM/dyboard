import React from 'react';
import { SolidFill } from 'jplot';
import { useTranslation } from 'react-i18next';

import ColorPicker from '../../../Form/ColorPicker';
import Spinner from '../../../Form/Spinner';

interface FillStyleSolidProps{
    style: SolidFill,
}

const FillStyleSolid: React.FC<FillStyleSolidProps> = ({
    style
}) => {
    const { t } = useTranslation('jplot');

    return (
        <>
            <ColorPicker
                name="color"
                text={t('widgets.fillStyle.solid.color')}
                color={`rgb(${style.color.r}, ${style.color.g}, ${style.color.b})`}
            />
            <Spinner
                name="opacity"
                text={t('widgets.fillStyle.solid.opacity')}
                initialValue={Math.round(style.opacity * 100)}
                min={0}
                max={100}
                transform={100}
            />
        </>
    );
};

export default FillStyleSolid;
