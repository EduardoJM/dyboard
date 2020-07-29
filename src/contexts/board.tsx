import React, { useContext, useState, createContext } from 'react';
import { ElementsCollection } from '../data/board';

interface BoardContextData {
    elements: ElementsCollection;
    changeElements: (newElements: ElementsCollection) => void;
}

const BoardContext = createContext<BoardContextData>({} as BoardContextData);

export const BoardContextProvider: React.FC = ({
    children
}) => {
    const [elements, setElements] = useState<ElementsCollection>([]);

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
