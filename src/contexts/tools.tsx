import React, { useContext, useState, createContext } from 'react';

import { ModalAddText, ModalAddImage } from '../modals';

import { ElementAll } from '../data/board';
import { useBoard } from '../contexts/board';

type Tools = 'cursor' | 'drag' | 'resize';

interface ToolsContextData {
    currentTool: Tools;
    changeCurrentTool: (tool: Tools) => void;
    addText: () => void;
    addImage: () => void;
    elementToAdd: ElementAll | null;
    setCatchClick: (element: ElementAll) => void;
    catchedClick: (x: number, y: number) => void;
    currentElement: ElementAll | null;
    setCurrentElement: (element: ElementAll | null) => void;
}

const ToolsContext = createContext<ToolsContextData>({} as ToolsContextData);

export const ToolsContextProvider: React.FC = ({
    children
}) => {
    const [modalStates, setModalStates] = useState({
        addText: false,
        addImage: false
    });
    const [currentTool, setCurrentTool] = useState<Tools>('cursor');
    const [elementToAdd, setElementToAdd] = useState<ElementAll | null>(null);
    const [currentElement, setCurrentElement] = useState<ElementAll | null>(null);
    const boardData = useBoard();

    const addText = () => {
        setModalStates({
            ...modalStates,
            addText: true
        });
    };

    const addImage = () => {
        setModalStates({
            ...modalStates,
            addImage: true
        });
    };

    function handleCloseModal(id: string) {
        setModalStates({
            ...modalStates,
            [id]: false
        });
    };

    function handleSetCatchClick(element: ElementAll) {
        setElementToAdd(element);
    }

    function handleCatchedClick(x: number, y: number) {
        if (!elementToAdd) {
            return;
        }
        const array = [
            ...boardData.elements,
            {
                ...elementToAdd,
                left: x,
                top: y
            }
        ];
        boardData.changeElements(array);
        setElementToAdd(null);
    }

    return (
        <>
            <ToolsContext.Provider value={{
                currentTool,
                changeCurrentTool: setCurrentTool,
                addText,
                addImage,
                elementToAdd,
                setCatchClick: handleSetCatchClick,
                catchedClick: handleCatchedClick,
                currentElement,
                setCurrentElement
            }}>
                { children }
                <ModalAddText modalId="addText" opened={modalStates.addText} handleClose={handleCloseModal} />
                <ModalAddImage modalId="addImage" opened={modalStates.addImage} handleClose={handleCloseModal} />
            </ToolsContext.Provider>
        </>
    );
};

export default ToolsContext;

export function useTools() : ToolsContextData {
    const context = useContext(ToolsContext);

    return context;
}
