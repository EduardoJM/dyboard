import React, { useContext, useState, createContext } from 'react';

import { ModalAddText, ModalAddImage } from '../modals';

type Tools = 'cursor' | 'drag' | 'resize';

interface ToolsContextData {
    currentTool: Tools;
    changeCurrentTool: (tool: Tools) => void;
    addText: () => void;
    addImage: () => void;
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

    return (
        <>
            <ToolsContext.Provider value={{
                currentTool,
                changeCurrentTool: setCurrentTool,
                addText,
                addImage
            }}>
                { children }
            </ToolsContext.Provider>
            <ModalAddText modalId="addText" opened={modalStates.addText} handleClose={handleCloseModal} />
            <ModalAddImage modalId="addImage" opened={modalStates.addImage} handleClose={handleCloseModal} />
        </>
    );
};

export default ToolsContext;

export function useTools() : ToolsContextData {
    const context = useContext(ToolsContext);

    return context;
}
