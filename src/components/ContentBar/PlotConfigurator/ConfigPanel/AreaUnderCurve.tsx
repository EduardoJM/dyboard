import React from 'react';
import { FillStyle, AreaUnderCurve } from 'jplot';
import { useTranslation } from 'react-i18next';

import Input from '../../../Form/Input';
import Spinner from '../../../Form/Spinner';
import FillStyleWidget from '../Widgets/FillStyleWidget';

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
    const { t } = useTranslation('content');

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

    function handleApplyFillStyle(newStyle: FillStyle) {
        const idx = getUpdateItemIndex();
        item.fillStyle = newStyle;
        updateItem(idx);
    }

    return (
        <>
            <Input
                name="function_name"
                text={t('panels.plot.items.areaUnderCurve.props.curveName')}
                type="text"
                value={item.curveName}
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
            <FillStyleWidget
                text="Estilo"
                style={item.fillStyle}
                setStyle={handleApplyFillStyle}
            />
        </>
    );
};

export default AreaUnderCurvePanel;
