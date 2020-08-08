import React from 'react';
import jPlot from 'jplot';
import { useTranslation } from 'react-i18next';

import { PlotConfiguratorPanelProps } from './types';

import Input from '../../../Form/Input';
import Spinner from '../../../Form/Spinner';
import ColorPicker from '../../../Form/ColorPicker';

const AreaUnderCurvePanel: React.FC<PlotConfiguratorPanelProps> = ({
    item,
    getUpdateItemIndex,
    updateItem
}) => {
    const { t } = useTranslation('content');

    function handleCurveNameChange(value: string) {
        if (!item || !(item instanceof jPlot.AreaUnderCurve)) {
            return;
        }
        const idx = getUpdateItemIndex();
        item.curveName = value;
        updateItem(idx);
    }

    function handleSpinnerUpdate(prop: 'left' | 'right', value: number) {
        if (!item || !(item instanceof jPlot.AreaUnderCurve)) {
            return;
        }
        const idx = getUpdateItemIndex();
        if (prop === 'left') {
            item.left = value;
        } else if (prop === 'right') {
            item.right = value;
        }
        updateItem(idx);
    }

    function handleSetColor(color: string) {
        if (!item || !(item instanceof jPlot.AreaUnderCurve)) {
            return;
        }
        const idx = getUpdateItemIndex();
        item.fillStyle = color;
        updateItem(idx);
    }

    if (!item || !(item instanceof jPlot.AreaUnderCurve)) {
        return null;
    }
    return (
        <>
            <Input
                name="function_name"
                text={t('panels.plot.items.areaUnderCurve.props.curveName')}
                type="text"
                value={item.name}
                onChange={(e) => handleCurveNameChange(e.target.value)}
            />
            <Spinner
                labeled
                text={t('panels.plot.items.areaUnderCurve.props.left')}
                min={-100}
                max={100}
                value={item.left}
                onChange={(v) => handleSpinnerUpdate('left', v)}
            />
            <Spinner
                labeled
                text={t('panels.plot.items.areaUnderCurve.props.right')}
                min={-100}
                max={100}
                value={item.right}
                onChange={(v) => handleSpinnerUpdate('right', v)}
            />
            <ColorPicker
                onSubmit={handleSetColor}
                color={item.fillStyle}
                text={t('panels.plot.items.areaUnderCurve.props.color')}
            />
        </>
    );
};

export default AreaUnderCurvePanel;
