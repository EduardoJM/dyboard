import React from 'react';
import { Axis, LineStyle } from 'jplot';
import { useTranslation } from 'react-i18next';

import Switch from '../../../Form/Switch';
import LineStyleWidget from '../Widgets/LineStyleWidget';

export interface AxisPanelrops {
    item: Axis;
    getUpdateItemIndex: () => number;
    updateItem: (idx: number) => void;
}

const AxisPanel: React.FC<AxisPanelrops> = ({
    item,
    getUpdateItemIndex,
    updateItem
}) => {
    const { t } = useTranslation('jplot');

    type AxisProp = 'xAxis' | 'yAxis' | 'arrows'
                    | 'xAxisThick' | 'yAxisThick'
                    | 'xAxisThickNumbers' | 'yAxisThickNumbers';

    function handleSwitchChange(prop: AxisProp, value: boolean) {
        const idx = getUpdateItemIndex();
        if (prop === 'xAxis') {
            item.xAxis = value;
        } else if (prop === 'yAxis') {
            item.yAxis = value;
        } else if (prop === 'arrows') {
            item.arrows = value;
        } else if (prop === 'xAxisThick') {
            item.xAxisThick = value;
        } else if (prop === 'yAxisThick') {
            item.yAxisThick = value;
        } else if (prop === 'xAxisThickNumbers') {
            item.xAxisThickNumbers = value;
        } else if (prop === 'yAxisThickNumbers') {
            item.yAxisThickNumbers = value;
        }
        updateItem(idx);
    }

    function handleApplyHorizontalAxisStyle(style: LineStyle) {
        const idx = getUpdateItemIndex();
        item.xAxisStyle = style;
        updateItem(idx);
    }

    function handleApplyHorizontalAxisThickStyle(style: LineStyle) {
        const idx = getUpdateItemIndex();
        item.xAxisThickStyle = style;
        updateItem(idx);
    }

    function handleApplyVerticalAxisStyle(style: LineStyle) {
        const idx = getUpdateItemIndex();
        item.yAxisStyle = style;
        updateItem(idx);
    }

    function handleApplyVerticalAxisThickStyle(style: LineStyle) {
        const idx = getUpdateItemIndex();
        item.yAxisThickStyle = style;
        updateItem(idx);
    }

    return (
        <>
            <Switch
                checked={item.xAxis}
                handleCheckChange={(v) => handleSwitchChange('xAxis', v)}
                text={t('panels.axis.xAxis')}
            />
            <LineStyleWidget
                style={item.xAxisStyle}
                setStyle={handleApplyHorizontalAxisStyle}
                text={t('panels.axis.xAxisStyle')}
            />
            <Switch
                checked={item.xAxisThick}
                handleCheckChange={(v) => handleSwitchChange('xAxisThick', v)}
                text={t('panels.axis.xAxisThick')}
            />
            <Switch
                checked={item.xAxisThickNumbers}
                handleCheckChange={(v) => handleSwitchChange('xAxisThickNumbers', v)}
                text={t('panels.axis.xAxisThickNumbers')}
            />
            <LineStyleWidget
                style={item.xAxisThickStyle}
                setStyle={handleApplyHorizontalAxisThickStyle}
                text={t('panels.axis.xAxisThickStyle')}
            />
            <Switch
                checked={item.yAxis}
                handleCheckChange={(v) => handleSwitchChange('yAxis', v)}
                text={t('panels.axis.yAxis')}
            />
            <LineStyleWidget
                style={item.yAxisStyle}
                setStyle={handleApplyVerticalAxisStyle}
                text={t('panels.axis.yAxisStyle')}
            />
            <Switch
                checked={item.yAxisThick}
                handleCheckChange={(v) => handleSwitchChange('yAxisThick', v)}
                text={t('panels.axis.yAxisThick')}
            />
            <Switch
                checked={item.yAxisThickNumbers}
                handleCheckChange={(v) => handleSwitchChange('yAxisThickNumbers', v)}
                text={t('panels.axis.yAxisThickNumbers')}
            />
            <LineStyleWidget
                style={item.yAxisThickStyle}
                setStyle={handleApplyVerticalAxisThickStyle}
                text={t('panels.axis.yAxisThickStyle')}
            />
            <Switch
                checked={item.arrows}
                handleCheckChange={(v) => handleSwitchChange('arrows', v)}
                text={t('panels.axis.arrows')}
            />
        </>
    );
};

export default AxisPanel;
