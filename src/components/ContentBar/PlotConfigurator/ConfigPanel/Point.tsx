import React, { useState } from 'react';
import { Point, FillStyle, LineStyle } from 'jplot';
import { useTranslation } from 'react-i18next';

import Switch from '../../../Form/Switch';
import Spinner from '../../../Form/Spinner';
import Slider from '../../../Form/Slider';
import LineStyleWidget from '../Widgets/LineStyleWidget';
import FillStyleWidget from '../Widgets/FillStyleWidget';

interface PointPanelProps {
    item: Point;
    getUpdateItemIndex: () => number;
    updateItem: (idx: number) => void;
}

const PointPanel: React.FC<PointPanelProps> = ({
    item,
    getUpdateItemIndex,
    updateItem
}) => {
    const [xCoord, setXCoord] = useState(item.x);
    const [yCoord, setYCoord] = useState(item.y);
    const [pointSize, setPointSize] = useState(item.pointSize);
    const { t } = useTranslation('jplot');

    function handleSetFillStyle(style: FillStyle) {
        const idx = getUpdateItemIndex();
        item.fillStyle = style;
        updateItem(idx);
    }

    function handleSetStrokeStyle(style: LineStyle) {
        const idx = getUpdateItemIndex();
        item.strokeStyle = style;
        updateItem(idx);
    }

    function handleToggleStroke(value: boolean) {
        const idx = getUpdateItemIndex();
        item.stroke = value;
        updateItem(idx);
    }

    function handleApplyCoord(coord: 'x' | 'y', value: number) {
        const idx = getUpdateItemIndex();
        if (coord === 'x') {
            item.x = value;
        } else {
            item.y = value;
        }
        updateItem(idx);
    }

    function handleApplyPointSize(value: number) {
        const idx = getUpdateItemIndex();
        item.pointSize = value;
        updateItem(idx);
    }

    return (
        <>
            <Spinner
                labeled
                text={t('panels.point.x')}
                value={xCoord}
                min={-50000}
                max={50000}
                onChange={setXCoord}
                onDragStop={(v) => handleApplyCoord('x', v)}
            />
            <Spinner
                labeled
                text={t('panels.point.y')}
                value={yCoord}
                min={-50000}
                max={50000}
                onChange={setYCoord}
                onDragStop={(v) => handleApplyCoord('y', v)}
            />
            <Slider
                text={t('panels.point.size')}
                min={1}
                max={20}
                value={pointSize}
                onValueChange={setPointSize}
                onDragStop={handleApplyPointSize}
            />
            <FillStyleWidget
                text={t('panels.point.fillStyle')}
                style={item.fillStyle}
                setStyle={handleSetFillStyle}
            />
            <Switch
                checked={item.stroke}
                text={t('panels.point.stroke')}
                handleCheckChange={handleToggleStroke}
            />
            <LineStyleWidget
                text={t('panels.point.strokeStyle')}
                style={item.strokeStyle}
                setStyle={handleSetStrokeStyle}
            />
        </>
    );
};

export default PointPanel;
