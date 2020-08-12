import React from 'react';
import { Axis } from 'jplot';
import { useTranslation } from 'react-i18next';

import Switch from '../../../Form/Switch';
import { LineStyleWidget } from '../Widgets';

export interface AxisPanelrops {
    item: Axis;
}

const AxisPanel: React.FC<AxisPanelrops> = ({
    item
}) => {
    const { t } = useTranslation('jplot');

    return (
        <>
            <Switch
                name="xAxis"
                initialCheck={item.xAxis}
                text={t('panels.axis.xAxis')}
            />
            <LineStyleWidget
                name="xAxisStyle"
                style={item.xAxisStyle}
                text={t('panels.axis.xAxisStyle')}
            />
            <Switch
                name="xAxisThick"
                initialCheck={item.xAxisThick}
                text={t('panels.axis.xAxisThick')}
            />
            <Switch
                name="xAxisThickNumbers"
                initialCheck={item.xAxisThickNumbers}
                text={t('panels.axis.xAxisThickNumbers')}
            />
            <LineStyleWidget
                name="xAxisThickStyle"
                style={item.xAxisThickStyle}
                text={t('panels.axis.xAxisThickStyle')}
            />
            <Switch
                name="yAxis"
                initialCheck={item.yAxis}
                text={t('panels.axis.yAxis')}
            />
            <LineStyleWidget
                name="yAxisStyle"
                style={item.yAxisStyle}
                text={t('panels.axis.yAxisStyle')}
            />
            <Switch
                name="yAxisThick"
                initialCheck={item.yAxisThick}
                text={t('panels.axis.yAxisThick')}
            />
            <Switch
                name="yAxisThickNumbers"
                initialCheck={item.yAxisThickNumbers}
                text={t('panels.axis.yAxisThickNumbers')}
            />
            <LineStyleWidget
                name="yAxisThickStyle"
                style={item.yAxisThickStyle}
                text={t('panels.axis.yAxisThickStyle')}
            />
            <Switch
                name="arrows"
                initialCheck={item.arrows}
                text={t('panels.axis.arrows')}
            />
        </>
    );
};

export default AxisPanel;
