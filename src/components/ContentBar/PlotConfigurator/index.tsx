import React, { useState } from 'react';
import useMeasure from 'react-use-measure';
import jPlot, { RenderItem } from 'jplot';

import { ElementPlot } from '../../../data/board';

import DropDownButton from '../../Form/DropDownButton';
import Switch from '../../Form/Switch';

import { Container, PlotsList, PlotsConfig } from './styles';

import { useBoard } from '../../../contexts/board';
import { useTools } from '../../../contexts/tools';

interface PlotConfiguratorProps {
    data: ElementPlot;
}

const PlotConfigurator: React.FC<PlotConfiguratorProps> = ({ data }) => {
    const [contentRef, bounds] = useMeasure();
    const [editing, setEditing] = useState<RenderItem | null>(null);
    const tools = useTools();
    const board = useBoard();

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

    const addDropDownContent = (
        <div className="dropdown-content">
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

    function updateEditing(editingIndex: number) {
        const newItem = {
            ...data,
            items: [
                ...data.items.slice(0, editingIndex),
                editing,
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

    function handleAxisSwitchChange(prop: string, value: boolean) {
        if (!editing || !(editing instanceof jPlot.Axis)) {
            return;
        }
        const idx = data.items.indexOf(editing);
        if (prop === 'xAxis') {
            editing.xAxis = value;
        } else if (prop === 'yAxis') {
            editing.yAxis = value;
        } else if (prop === 'arrows') {
            editing.arrows = value;
        } else if (prop === 'xAxisThick') {
            editing.xAxisThick = value;
        } else if (prop === 'yAxisThick') {
            editing.yAxisThick = value;
        }
        updateEditing(idx);
    }

    function handleFunctionChange(value: string) {
        if (!editing || !(editing instanceof jPlot.Function)) {
            return;
        }
        const idx = data.items.indexOf(editing);
        editing.function = value;
        updateEditing(idx);
    }

    function renderConfigs() {
        if (!editing) {
            return null;
        }
        return (
            <>
                <div className="heading">
                    {renderListItemContent(editing, true)}
                </div>
                <div className="editor">
                    {editing instanceof jPlot.Axis && (
                        <>
                            <Switch
                                checked={editing.xAxis}
                                handleCheckChange={(v) => handleAxisSwitchChange('xAxis', v)}
                                text="Eixo X"
                            />
                            <Switch
                                checked={editing.xAxisThick}
                                handleCheckChange={(v) => handleAxisSwitchChange('xAxisThick', v)}
                                text="Marcações em X"
                            />
                            <Switch
                                checked={editing.yAxis}
                                handleCheckChange={(v) => handleAxisSwitchChange('yAxis', v)}
                                text="Eixo Y"
                            />
                            <Switch
                                checked={editing.yAxisThick}
                                handleCheckChange={(v) => handleAxisSwitchChange('yAxisThick', v)}
                                text="Marcações em Y"
                            />
                            <Switch
                                checked={editing.arrows}
                                handleCheckChange={(v) => handleAxisSwitchChange('arrows', v)}
                                text="Setas"
                            />
                        </>
                    )}
                    {editing instanceof jPlot.Function && (
                        <>
                            <p>Função</p>
                            <input
                                type="text"
                                value={editing.function}
                                onChange={(e) => handleFunctionChange(e.target.value)}
                            />
                        </>
                    )}
                </div>
            </>
        );
    }

    return (
        <Container ref={contentRef}>
            <PlotsList
                height={200}
                width={bounds.width}
                axis="y"
                minConstraints={[200, 100]}
                maxConstraints={[200, 400]}
            >
                <div className="list">
                    {data.items.map((item, index) => (
                        <div
                            className={`list-item${editing === item ? ' active' : ''}`}
                            key={`index${index}`}
                            onClick={() => setEditing(item)}
                        >
                            {renderListItemContent(item, false)}
                        </div>
                    ))}
                </div>
                <div className="list-tools">
                    <DropDownButton dropDown={addDropDownContent}>Add</DropDownButton>
                </div>
            </PlotsList>
            <PlotsConfig>
                {renderConfigs()}
            </PlotsConfig>
        </Container>
    );
};

export default PlotConfigurator;
