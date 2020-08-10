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
    const { t } = useTranslation('content');

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

    function handleApplyVerticalAxisStyle(style: LineStyle) {
        const idx = getUpdateItemIndex();
        item.yAxisStyle = style;
        updateItem(idx);
    }

    return (
        <>
            <Switch
                checked={item.xAxis}
                handleCheckChange={(v) => handleSwitchChange('xAxis', v)}
                text={t('panels.plot.items.axis.props.xAxis')}
            />
            <LineStyleWidget
                style={item.xAxisStyle}
                setStyle={handleApplyHorizontalAxisStyle}
                text="X AXIS LINE STYLE"
            />
            <Switch
                checked={item.xAxisThick}
                handleCheckChange={(v) => handleSwitchChange('xAxisThick', v)}
                text={t('panels.plot.items.axis.props.xAxisThick')}
            />
            <Switch
                checked={item.xAxisThickNumbers}
                handleCheckChange={(v) => handleSwitchChange('xAxisThickNumbers', v)}
                text={t('panels.plot.items.axis.props.xAxisThickNumbers')}
            />
            <Switch
                checked={item.yAxis}
                handleCheckChange={(v) => handleSwitchChange('yAxis', v)}
                text={t('panels.plot.items.axis.props.yAxis')}
            />
            <LineStyleWidget
                style={item.yAxisStyle}
                setStyle={handleApplyVerticalAxisStyle}
                text="Y AXIS LINE STYLE"
            />
            <Switch
                checked={item.yAxisThick}
                handleCheckChange={(v) => handleSwitchChange('yAxisThick', v)}
                text={t('panels.plot.items.axis.props.yAxisThick')}
            />
            <Switch
                checked={item.yAxisThickNumbers}
                handleCheckChange={(v) => handleSwitchChange('yAxisThickNumbers', v)}
                text={t('panels.plot.items.axis.props.yAxisThickNumbers')}
            />
            <Switch
                checked={item.arrows}
                handleCheckChange={(v) => handleSwitchChange('arrows', v)}
                text={t('panels.plot.items.axis.props.arrows')}
            />
        </>
    );
};

export default AxisPanel;
