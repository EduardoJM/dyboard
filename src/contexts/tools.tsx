import React, { useContext, useState, createContext } from 'react';

import Modal from '../components/Modal';

interface ToolsContextData {
    addText: () => void;
    addImage: () => void;
}

const ToolsContext = createContext<ToolsContextData>({} as ToolsContextData);

export const ToolsContextProvider: React.FC = ({
    children
}) => {
    const [addTextModalVisible, setAddTextModalVisible] = useState(false);
    const [addImageModalVisible, setAddImageModalVisible] = useState(false);

    const addText = () => {
        setAddTextModalVisible(true);
    };

    const addImage = () => {
        setAddImageModalVisible(true);
    };

    return (
        <>
            <ToolsContext.Provider value={{
                addText,
                addImage
            }}>
                { children }
            </ToolsContext.Provider>
            <Modal
                visible={addTextModalVisible}
                title="Adicionar Texto"
                closeModalRequest={() => setAddTextModalVisible(false)}
            >
                Adicionar novo texto!
            </Modal>
            <Modal
                visible={addImageModalVisible}
                title="Adicionar Imagem"
                closeModalRequest={() => setAddImageModalVisible(false)}
            >
                Adicionar nova Imagem!
            </Modal>
        </>
    );
};

export default ToolsContext;

export function useTools() : ToolsContextData {
    const context = useContext(ToolsContext);

    return context;
}
