import React from 'react';
import jPlot, { RenderItem } from 'jplot';
import { useTranslation } from 'react-i18next';

import Scrollbars from '../../../Scrollbars';

import { ElementPlot } from '../../../../data/board';

import { useBoard } from '../../../../contexts/board';
import { useTools } from '../../../../contexts/tools';

import AxisPanel from './Axis';
import FunctionPanel from './Function';
import AreaUnderCurvePanel from './AreaUnderCurve';

interface ConfigPanelProps {
    data: ElementPlot;
    currentItem: RenderItem | null;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
    data,
    currentItem
}) => {
    const board = useBoard();
    const tools = useTools();
    const { t } = useTranslation('content');

    function updateCurrentItem(editingIndex: number) {
        const newItem = {
            ...data,
            items: [
                ...data.items.slice(0, editingIndex),
                currentItem,
                ...data.items.slice(editingIndex + 1)
            ]
        };
        const { elements, changeElements } = board;
        const idx = elements.indexOf(data);
        const newElements = [
            ...elements.slice(0, idx),
            newItem,
            ...elements.slice(idx + 1)
        ];
        changeElements(newElements);
        tools.setCurrentElement(newItem);
    }

    function getUpdateItemIndex() {
        if (!currentItem) {
            return -1;
        }
        return data.items.indexOf(currentItem);
    }

    if (!currentItem) {
        return (
            <div className="fit-center-text">
                {t('panels.no-select')}
            </div>
        );
    }
    return (
        <>
            <div className="heading">{t('panels.plot.configHeading')}</div>
            <div className="editor">
                <Scrollbars>
                    <div className="content">
                        {currentItem instanceof jPlot.Axis && (
                            <AxisPanel
                                item={currentItem}
                                updateItem={updateCurrentItem}
                                getUpdateItemIndex={getUpdateItemIndex}
                            />
                        )}
                        {currentItem instanceof jPlot.Function && (
                            <FunctionPanel
                                item={currentItem}
                                updateItem={updateCurrentItem}
                                getUpdateItemIndex={getUpdateItemIndex}
                            />
                        )}
                        {currentItem instanceof jPlot.AreaUnderCurve && (
                            <AreaUnderCurvePanel
                                item={currentItem}
                                updateItem={updateCurrentItem}
                                getUpdateItemIndex={getUpdateItemIndex}
                            />
                        )}
                    </div>
                </Scrollbars>
            </div>
        </>
    );
};

export default ConfigPanel;
