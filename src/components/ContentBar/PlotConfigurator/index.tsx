import React, { useState } from 'react';
import jPlot, { RenderItem } from 'jplot';
import { MdAdd, MdDelete } from 'react-icons/md';

import { ElementPlot } from '../../../data/board';

import DropDownButton from '../../Form/DropDownButton';
import Scrollbars from '../../Scrollbars';

import { Container, PlotsList, PlotsConfig, ListToolButton } from './styles';

import { useBoard } from '../../../contexts/board';
import { useTools } from '../../../contexts/tools';
import { useTheme } from '../../../contexts/theme';

import ConfigPanel from './Panels';

interface PlotConfiguratorProps {
    data: ElementPlot;
}

const PlotConfigurator: React.FC<PlotConfiguratorProps> = ({ data }) => {
    const [editing, setEditing] = useState<RenderItem | null>(null);
    const [addRenderItemsDropDown, setAddRenderItemsDropDown] = useState(false);
    const tools = useTools();
    const board = useBoard();
    const theme = useTheme();

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

    const addDropDownContent = (
        <div className="add-dropdown-content">
            <button onClick={addAxis}>Axis</button>
            <button onClick={addFunction}>Function</button>
        </div>
    );

    function renderListItemContent(item: RenderItem, nameOnly: boolean) {
        if (item instanceof jPlot.Axis) {
            return 'Eixo';
        } else if (item instanceof jPlot.Function) {
            return 'Função';
        } else if (item instanceof jPlot.Point) {
            let str = 'Ponto';
            if (!nameOnly) {
                str = `${str} (${item.x}, ${item.y})`;
            }
            return str;
        }
        return 'Não Suportado';
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

    return (
        <Container theme={theme}>
            <PlotsList theme={theme}>
                <div className="heading">Itens</div>
                <div className="list">
                    <Scrollbars>
                        {data.items.map((item, index) => (
                            <div
                                className={`list-item${editing === item ? ' active' : ''}`}
                                key={`index${index}`}
                                onClick={() => setEditing(item)}
                            >
                                {renderListItemContent(item, false)}
                            </div>
                        ))}
                    </Scrollbars>
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
