import React, { useContext, useState, createContext } from 'react';

import { ModalAddText, ModalAddImage } from '../modals';

interface ToolsContextData {
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
