import React, { useContext, useEffect, useState, createContext } from 'react';
import { ipcRenderer } from 'electron';

import {
    ElementAll,
    ElementsCollection,
    LoaderHelperElement,
    parseToElements,
    elementsToString
} from '../data/board';
import { ToolsContextData } from './tools';

interface BoardContextData {
    elements: ElementsCollection;
    changeElements: (newElements: ElementsCollection) => void;
    updateElementBounds: (
        el: ElementAll,
        left: number,
        top: number,
        width: number,
        height: number,
        tools: ToolsContextData
    ) => void;
    updateElement: (index: number, item: ElementAll) => void;
}

const BoardContext = createContext<BoardContextData>({} as BoardContextData);

export const BoardContextProvider: React.FC = ({
    children
}) => {
    const [elements, setElements] = useState<ElementsCollection>([]);
    const [needSave, setNeedSave] = useState(false);
    const [savePath, setSavePath] = useState('');

    useEffect(() => {
        ipcRenderer.on('request-save', (event, arg: { path: string; }) => {
            setSavePath(arg.path);
            setNeedSave(true);
        });
        ipcRenderer.on('loaded', (event, arg: { path: string; data: LoaderHelperElement[] }) => {
            // TODO: set the file-path
            setElements(parseToElements(arg.data));
        });
        // TODO: add an 'reply' catch ('saved')
    }, []);

    useEffect(() => {
        if (!needSave) {
            return;
        }
        ipcRenderer.send('save', {
            data: elementsToString(elements),
            path: savePath
        });
        setSavePath('');
        setNeedSave(false);
    }, [needSave]);

    function updateElementBounds(
        el: ElementAll,
        left: number,
        top: number,
        width: number,
        height: number,
        tools: ToolsContextData
    ) {
        const idx = elements.indexOf(el);
        if (idx < 0 || idx >= elements.length) {
            return;
        }
        const currentElement = tools.currentElement === el;
        el.left = left;
        el.top = top;
        el.width = width;
        el.height = height;
        setElements([
            ...elements.slice(0, idx),
            el,
            ...elements.slice(idx + 1)
        ]);
        if (currentElement) {
            tools.setCurrentElement(el);
        }
    }

    function updateElement(index: number, item: ElementAll) {
        const newElements = [
            ...elements.slice(0, index),
            item,
            ...elements.slice(index + 1)
        ];
        setElements(newElements);
    }

    return (
        <BoardContext.Provider value={{
            elements,
            updateElementBounds,
            updateElement,
            changeElements: setElements
        }}>
            { children }
        </BoardContext.Provider>
    );
};

export default BoardContext;

export function useBoard() : BoardContextData {
    const context = useContext(BoardContext);

    return context;
}
