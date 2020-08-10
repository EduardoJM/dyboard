import React from 'react';
import { FillStyle, LineStyle, AreaUnderCurve } from 'jplot';
import { useTranslation } from 'react-i18next';

import Input from '../../../Form/Input';
import Spinner from '../../../Form/Spinner';
import Switch from '../../../Form/Switch';
import FillStyleWidget from '../Widgets/FillStyleWidget';
import LineStyleWidget from '../Widgets/LineStyleWidget';

export interface AreaUnderCurvePanelProps {
    item: AreaUnderCurve;
    getUpdateItemIndex: () => number;
    updateItem: (idx: number) => void;
}

const AreaUnderCurvePanel: React.FC<AreaUnderCurvePanelProps> = ({
    item,
    getUpdateItemIndex,
    updateItem
}) => {
    const { t } = useTranslation('jplot');

    function handleCurveNameChange(value: string) {
        const idx = getUpdateItemIndex();
        item.curveName = value;
        updateItem(idx);
    }

    function handleSpinnerUpdate(prop: 'left' | 'right', value: number) {
        const idx = getUpdateItemIndex();
        if (prop === 'left') {
            item.left = value;
        } else if (prop === 'right') {
            item.right = value;
        }
        updateItem(idx);
    }

    function handleToggleFill(check: boolean) {
        const idx = getUpdateItemIndex();
        item.fill = check;
        updateItem(idx);
    }

    function handleApplyFillStyle(newStyle: FillStyle) {
        const idx = getUpdateItemIndex();
        item.fillStyle = newStyle;
        updateItem(idx);
    }

    function handleToggleStroke(check: boolean) {
        const idx = getUpdateItemIndex();
        item.stroke = check;
        updateItem(idx);
    }

    function handleApplyStrokeStyle(newStyle: LineStyle) {
        const idx = getUpdateItemIndex();
        item.strokeStyle = newStyle;
        updateItem(idx);
    }

    return (
        <>
            <Input
                name="function_name"
                text={t('panels.areaUnderCurve.curveName')}
                type="text"
                value={item.curveName}
                onChange={(e) => handleCurveNameChange(e.target.value)}
            />
            <Spinner
                labeled
                text={t('panels.areaUnderCurve.left')}
                min={-100}
                max={100}
                value={item.left}
                onChange={(v) => handleSpinnerUpdate('left', v)}
            />
            <Spinner
                labeled
                text={t('panels.areaUnderCurve.right')}
                min={-100}
                max={100}
                value={item.right}
                onChange={(v) => handleSpinnerUpdate('right', v)}
            />
            <Switch
                text={t('panels.areaUnderCurve.fill')}
                checked={item.fill}
                handleCheckChange={handleToggleFill}
            />
            <FillStyleWidget
                text={t('panels.areaUnderCurve.fillStyle')}
                style={item.fillStyle}
                setStyle={handleApplyFillStyle}
            />
            <Switch
                text={t('panels.areaUnderCurve.stroke')}
                checked={item.stroke}
                handleCheckChange={handleToggleStroke}
            />
            <LineStyleWidget
                text={t('panels.areaUnderCurve.strokeStyle')}
                style={item.strokeStyle}
                setStyle={handleApplyStrokeStyle}
            />
        </>
    );
};

export default AreaUnderCurvePanel;
