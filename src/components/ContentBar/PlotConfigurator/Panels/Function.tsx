import React from 'react';
import jPlot from 'jplot';

import { PlotConfiguratorPanelProps } from './types';

import Slider from '../../../Form/Slider';
import ColorPicker from '../../../Form/ColorPicker';

const FunctionPanel: React.FC<PlotConfiguratorPanelProps> = ({
    item,
    getUpdateItemIndex,
    updateItem
}) => {
    function handleFunctionChange(value: string) {
        if (!item || !(item instanceof jPlot.Function)) {
            return;
        }
        const idx = getUpdateItemIndex();
        item.function = value;
        updateItem(idx);
    }

    function handleSetColor(color: string) {
        if (!item || !(item instanceof jPlot.Function)) {
            return;
        }
        const idx = getUpdateItemIndex();
        item.color = color;
        updateItem(idx);
    }

    function handleSetLineWidth(width: number) {
        if (!item || !(item instanceof jPlot.Function)) {
            return;
        }
        const idx = getUpdateItemIndex();
        item.lineWidth = width;
        updateItem(idx);
    }

    if (!item || !(item instanceof jPlot.Function)) {
        return null;
    }
    return (
        <>
            <p>Função</p>
            <input
                type="text"
                value={item.function}
                onChange={(e) => handleFunctionChange(e.target.value)}
            />
            <ColorPicker
                onSubmit={handleSetColor}
                color={item.color}
                text="Cor"
            />
            <Slider
                text="Espessura do Traço"
                min={1}
                max={10}
                value={item.lineWidth}
                onValueChange={handleSetLineWidth}
            />
        </>
    );
};

export default FunctionPanel;
