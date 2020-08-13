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
    const tools = useTools();
    const board = useBoard();
    const theme = useTheme();
    const { t } = useTranslation('jplot');

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
    }

    function addFunction() {
        addPlotItem(new jPlot.Function());
    }

    function addAreaUnderCurve() {
        addPlotItem(new jPlot.AreaUnderCurve());
    }

    function addPoint() {
        addPlotItem(new jPlot.Point());
    }

    function getListItemName(item: RenderItem) {
        if (item instanceof jPlot.Axis) {
            return t('items.axis');
        } else if (item instanceof jPlot.Function) {
            return t('items.function');
        } else if (item instanceof jPlot.AreaUnderCurve) {
            return t('items.areaUnderCurve');
        } else if (item instanceof jPlot.Point) {
            return t('items.point');
        }
        return t('items.unsupported');
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
                <div className="heading">{t('itemsHeader')}</div>
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
                                {getListItemName(item)}
                            </ListBoxItem>
                        ))}
                    </ListBox>
                </div>
                <div className="list-tools">
                    <DropDownButton
                        dropDownButtons={[
                            { key: 'add-axis', label: t('items.axis'), click: addAxis },
                            { key: 'add-func', label: t('items.function'), click: addFunction },
                            { key: 'add-areauc', label: t('items.areaUnderCurve'), click: addAreaUnderCurve },
                            { key: 'add-point', label: t('items.point'), click: addPoint }
                        ]}
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
                <ConfigPanel data={data} currentItem={editing} setCurrentItem={setEditing} />
            </PlotsConfig>
        </Container>
    );
};

export default PlotConfigurator;
