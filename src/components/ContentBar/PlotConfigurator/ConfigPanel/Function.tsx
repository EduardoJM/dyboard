import React from 'react';
import { LineStyle, Function as FunctionItem } from 'jplot';
import { useTranslation } from 'react-i18next';

import Spinner from '../../../Form/Spinner';
import Input from '../../../Form/Input';
import LineStyleWidget from '../Widgets/LineStyleWidget';

interface FunctionPanelProps {
    item: FunctionItem;
    getUpdateItemIndex: () => number;
    updateItem: (idx: number) => void;
}

const FunctionPanel: React.FC<FunctionPanelProps> = ({
    item,
    getUpdateItemIndex,
    updateItem
}) => {
    const { t } = useTranslation('content');

    function handleTextChange(prop: 'name' | 'function', value: string) {
        const idx = getUpdateItemIndex();
        if (prop === 'function') {
            item.function = value;
        } else if (prop === 'name') {
            item.name = value;
        }
        updateItem(idx);
    }

    function handleSetResolution(value: number) {
        const idx = getUpdateItemIndex();
        item.resolution = value;
        updateItem(idx);
    }

    function handleSetLineStyle(style: LineStyle) {
        const idx = getUpdateItemIndex();
        item.lineStyle = style;
        updateItem(idx);
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
