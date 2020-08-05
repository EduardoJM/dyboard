import React from 'react';
import jPlot from 'jplot';
import { useTranslation } from 'react-i18next';

import { PlotConfiguratorPanelProps } from './types';

import Slider from '../../../Form/Slider';
import Switch from '../../../Form/Switch';
import ColorPicker from '../../../Form/ColorPicker';

const AxisPanel: React.FC<PlotConfiguratorPanelProps> = ({
    item,
    getUpdateItemIndex,
    updateItem
}) => {
    const { t } = useTranslation('content');

    type AxisProp = 'xAxis' | 'yAxis' | 'arrows'
                    | 'xAxisThick' | 'yAxisThick'
                    | 'xAxisThickNumbers' | 'yAxisThickNumbers';

    function handleSwitchChange(prop: AxisProp, value: boolean) {
        if (!item || !(item instanceof jPlot.Axis)) {
            return;
        }
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

    function handleSetLineWidth(prop: 'yAxisWidth' | 'xAxisWidth', value: number) {
        if (!item || !(item instanceof jPlot.Axis)) {
            return;
        }
        const idx = getUpdateItemIndex();
        if (prop === 'yAxisWidth') {
            item.yAxisWidth = value;
        } else if (prop === 'xAxisWidth') {
            item.xAxisWidth = value;
        }
        updateItem(idx);
    }

    function handleSetColor(axis: 'x' | 'y', color: string) {
        if (!item || !(item instanceof jPlot.Axis)) {
            return;
        }
        const idx = getUpdateItemIndex();
        if (axis === 'x') {
            item.xAxisColor = color;
            item.xAxisThickColor = color;
        } else {
            item.yAxisColor = color;
            item.yAxisThickColor = color;
        }
        updateItem(idx);
    }

    if (!item || !(item instanceof jPlot.Axis)) {
        return null;
    }
    return (
        <>
            <Switch
                checked={item.xAxis}
                handleCheckChange={(v) => handleSwitchChange('xAxis', v)}
                text={t('panels.plot.items.axis.props.xAxis')}
            />
            <Slider
                text={t('panels.plot.items.axis.props.xAxisWidth')}
                min={1}
                max={10}
                value={item.xAxisWidth}
                onValueChange={(v) => handleSetLineWidth('xAxisWidth', v)}
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
            <ColorPicker
                color={item.xAxisColor}
                text={t('panels.plot.items.axis.props.xAxisColor')}
                onSubmit={(color) => handleSetColor('x', color)}
            />
            <Switch
                checked={item.yAxis}
                handleCheckChange={(v) => handleSwitchChange('yAxis', v)}
                text={t('panels.plot.items.axis.props.yAxis')}
            />
            <Slider
                text={t('panels.plot.items.axis.props.yAxisWidth')}
                min={1}
                max={10}
                value={item.yAxisWidth}
                onValueChange={(v) => handleSetLineWidth('yAxisWidth', v)}
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
            <ColorPicker
                color={item.yAxisColor}
                text={t('panels.plot.items.axis.props.yAxisColor')}
                onSubmit={(color) => handleSetColor('y', color)}
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
