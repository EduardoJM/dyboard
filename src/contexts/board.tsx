import React, { useContext, useEffect, useState, createContext } from 'react';
import { ipcRenderer } from 'electron';

import {
    ElementsCollection,
    LoaderHelperElement,
    parseToElements,
    elementsToString
} from '../data/board';

interface BoardContextData {
    elements: ElementsCollection;
    changeElements: (newElements: ElementsCollection) => void;
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

    return (
        <BoardContext.Provider value={{
            elements,
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
