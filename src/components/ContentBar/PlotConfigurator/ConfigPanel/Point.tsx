import React from 'react';
import { Point } from 'jplot';
import { useTranslation } from 'react-i18next';

import Switch from '../../../Form/Switch';
import Spinner from '../../../Form/Spinner';
import Slider from '../../../Form/Slider';
import { LineStyleWidget, FillStyleWidget } from '../Widgets';

interface PointPanelProps {
    item: Point;
}

const PointPanel: React.FC<PointPanelProps> = ({
    item
}) => {
    const { t } = useTranslation('jplot');

    return (
        <>
            <Spinner
                name="x"
                text={t('panels.point.x')}
                initialValue={item.x}
                min={-50000}
                max={50000}
            />
            <Spinner
                name="y"
                text={t('panels.point.y')}
                initialValue={item.y}
                min={-50000}
                max={50000}
            />
            <Slider
                name="pointSize"
                text={t('panels.point.size')}
                min={1}
                max={20}
                initialValue={item.pointSize}
            />
            <FillStyleWidget
                name="fillStyle"
                text={t('panels.point.fillStyle')}
                initialStyle={item.fillStyle}
            />
            <Switch
                name="stroke"
                initialCheck={item.stroke}
                text={t('panels.point.stroke')}
            />
            <LineStyleWidget
                name="strokeStyle"
                text={t('panels.point.strokeStyle')}
                style={item.strokeStyle}
            />
        </>
    );
};

export default PointPanel;
