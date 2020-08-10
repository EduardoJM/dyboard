import React, { useState } from 'react';
import { SolidFill, Color } from 'jplot';
import { useTranslation } from 'react-i18next';

import ColorPicker from '../../../Form/ColorPicker';
import Spinner from '../../../Form/Spinner';

interface FillStyleSolidProps{
    style: SolidFill,
    setStyle: (newStyle: SolidFill) => void;
}

const FillStyleSolid: React.FC<FillStyleSolidProps> = ({
    style,
    setStyle
}) => {
    const [color, setColor] =
        useState(`rgb(${style.color.r}, ${style.color.g}, ${style.color.b})`);
    const [opacity, setOpacity] = useState(Math.floor(style.opacity * 100));
    const { t } = useTranslation('jplot');

    function handleApplyColor(newColor: string) {
        setColor(newColor);
        style.color = Color.fromString(newColor);
        setStyle(style);
    }

    function handleApplyOpacity(newOpacity: number) {
        style.opacity = newOpacity / 100;
        setStyle(style);
    }

    return (
        <>
            <ColorPicker
                text={t('widgets.fillStyle.solid.color')}
                color={color}
                onSubmit={handleApplyColor}
            />
            <Spinner
                labeled
                text={t('widgets.fillStyle.solid.opacity')}
                value={opacity}
                min={0}
                max={100}
                onChange={setOpacity}
                onDragStop={handleApplyOpacity}
                onInputBlur={handleApplyOpacity}
            />
        </>
    );
};

export default FillStyleSolid;
