import React, { useState } from 'react';
import jPlot, { RenderItem } from 'jplot';
import { MdAdd, MdDelete } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import { ElementPlot } from '../../../data/board';

import DropDownButton from '../../Form/DropDownButton';
import { ListBox, ListBoxItem } from '../../Form/DraggableListBox';

import { Container, PlotsList, PlotsConfig, ListToolButton } from './styles';

import { useBoard } from '../../../contexts/board';
import { useTools } from '../../../contexts/tools';
import { useTheme } from '../../../contexts/theme';

import ConfigPanel from './ConfigPanel';

interface PlotConfiguratorProps {
    data: ElementPlot;
}

const PlotConfigurator: React.FC<PlotConfiguratorProps> = ({ data }) => {
    const [editing, setEditing] = useState<RenderItem | null>(null);
    const [addRenderItemsDropDown, setAddRenderItemsDropDown] = useState(false);
    const tools = useTools();
    const board = useBoard();
    const theme = useTheme();
    const { t } = useTranslation('content');

    function addPlotItem(item: RenderItem) {
        const newItem = {
            ...data,
            items: [
                ...data.items,
                item
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

    function addAxis() {
        addPlotItem(new jPlot.Axis());
        setAddRenderItemsDropDown(false);
    }

    function addFunction() {
        addPlotItem(new jPlot.Function());
        setAddRenderItemsDropDown(false);
    }

    function addAreaUnderCurve() {
        addPlotItem(new jPlot.AreaUnderCurve());
        setAddRenderItemsDropDown(false);
    }

    const addDropDownContent = (
        <div className="add-dropdown-content">
            <button onClick={addAxis}>{t('panels.plot.items.axis.name')}</button>
            <button onClick={addFunction}>{t('panels.plot.items.function.name')}</button>
            <button onClick={addAreaUnderCurve}>{t('panels.plot.items.areaUnderCurve.name')}</button>
        </div>
    );

    function renderListItemContent(item: RenderItem, nameOnly: boolean) {
        if (item instanceof jPlot.Axis) {
            return t('panels.plot.items.axis.name');
        } else if (item instanceof jPlot.Function) {
            return t('panels.plot.items.function.name');
        } else if (item instanceof jPlot.AreaUnderCurve) {
            return t('panels.plot.items.areaUnderCurve.name');
        } else if (item instanceof jPlot.Point) {
            let str = t('panels.plot.items.point.name');
            if (!nameOnly) {
                str = `${str} (${item.x}, ${item.y})`;
            }
            return str;
        }
        return t('panels.plot.items.unsupported.name');
    }

    function handleDeleteItem() {
        if (!editing) {
            return;
        }
        let idx = data.items.indexOf(editing);
        const newItem = {
            ...data,
            items: [
                ...data.items.slice(0, idx),
                ...data.items.slice(idx + 1)
            ]
        };
        const { elements, changeElements } = board;
        idx = elements.indexOf(data);
        const newElements = [
            ...elements.slice(0, idx),
            newItem,
            ...elements.slice(idx + 1)
        ];
        changeElements(newElements);
        tools.setCurrentElement(newItem);
        setEditing(null);
    }

    function handleMovePlotItem(fromIndex: number, toIndex: number) {
        const dragged = data.items[fromIndex];
        const newItems = [...data.items];
        newItems.splice(fromIndex, 1);
        newItems.splice(toIndex, 0, dragged);
        const newItem = {
            ...data,
            items: newItems
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
        setEditing(null);
    }

    return (
        <Container theme={theme}>
            <PlotsList theme={theme}>
                <div className="heading">{t('panels.plot.itensHeading')}</div>
                <div className="list">
                    <ListBox>
                        {data.items.map((item, index) => (
                            <ListBoxItem
                                dragType="PLOT_ITEM"
                                dragMove={handleMovePlotItem}
                                selected={editing === item}
                                key={`index${index}`}
                                index={index}
                                onClick={() => setEditing(item)}
                            >
                                {renderListItemContent(item, false)}
                            </ListBoxItem>
                        ))}
                    </ListBox>
                </div>
                <div className="list-tools">
                    <DropDownButton
                        dropDown={addDropDownContent}
                        dropDownState={addRenderItemsDropDown}
                        setDropDownState={setAddRenderItemsDropDown}
                    >
                        <MdAdd size={24} />
                    </DropDownButton>
                    <ListToolButton
                        onClick={handleDeleteItem}
                    >
                        <MdDelete size={24} />
                    </ListToolButton>
                </div>
            </PlotsList>
            <PlotsConfig>
                <ConfigPanel data={data} currentItem={editing} />
            </PlotsConfig>
        </Container>
    );
};

export default PlotConfigurator;
