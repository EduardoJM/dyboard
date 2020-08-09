import React from 'react';
import jPlot, { LineStyle } from 'jplot';
import { useTranslation } from 'react-i18next';

import { PlotConfiguratorPanelProps } from './types';

import Spinner from '../../../Form/Spinner';
import Input from '../../../Form/Input';
import LineStyleWidget from '../LineStyleWidget';

const FunctionPanel: React.FC<PlotConfiguratorPanelProps> = ({
    item,
    getUpdateItemIndex,
    updateItem
}) => {
    const { t } = useTranslation('content');

    function handleTextChange(prop: 'name' | 'function', value: string) {
        if (!item || !(item instanceof jPlot.Function)) {
            return;
        }
        const idx = getUpdateItemIndex();
        if (prop === 'function') {
            item.function = value;
        } else if (prop === 'name') {
            item.name = value;
        }
        updateItem(idx);
    }

    function handleSetResolution(value: number) {
        if (!item || !(item instanceof jPlot.Function)) {
            return;
        }
        const idx = getUpdateItemIndex();
        item.resolution = value;
        updateItem(idx);
    }

    function handleSetLineStyle(style: LineStyle) {
        if (!item || !(item instanceof jPlot.Function)) {
            return;
        }
        const idx = getUpdateItemIndex();
        item.lineStyle = style;
        updateItem(idx);
    }

    if (!item || !(item instanceof jPlot.Function)) {
        return null;
    }
    return (
        <>
            <Input
                name="function_name"
                text={t('panels.plot.items.function.props.name')}
                type="text"
                value={item.name}
                onChange={(e) => handleTextChange('name', e.target.value)}
            />
            <Input
                name="function_expr"
                text={t('panels.plot.items.function.props.function')}
                type="text"
                value={item.function}
                onChange={(e) => handleTextChange('function', e.target.value)}
            />
            <LineStyleWidget
                text="Estilo"
                style={item.lineStyle}
                setStyle={handleSetLineStyle}
            />
            <Spinner
                labeled
                text={t('panels.plot.items.function.props.resolution')}
                min={10}
                max={1000}
                value={item.resolution}
                onChange={handleSetResolution}
            />
        </>
    );
};

export default FunctionPanel;
