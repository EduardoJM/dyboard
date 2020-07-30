import React, { useState } from 'react';
import { RawDraftContentState } from 'draft-js';

import Button from '../../Form/Button';
import ModalAddText from '../../../modals/ModalAddText';

import { ElementText } from '../../../data/board';

import { useBoard } from '../../../contexts/board';
import { useTools } from '../../../contexts/tools';

interface TextConfiguratorProps {
    data: ElementText;
}

const TextConfigurator: React.FC<TextConfiguratorProps> = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const board = useBoard();
    const tools = useTools();

    function handleEditClick() {
        setEditing(true);
    }

    function handleEditComplete(state: RawDraftContentState, text: string) {
        setEditing(false);
        const idx = board.elements.indexOf(data);
        const newItem = {
            ...data,
            text,
            rawContent: state
        };
        board.changeElements([
            ...board.elements.slice(0, idx),
            newItem,
            ...board.elements.slice(idx + 1)
        ]);
        tools.setCurrentElement(newItem);
    }

    function handleModalClose(id: string) {
        if (id === 'textConfiguratorEditor') {
            setEditing(false);
        }
    }

    return (
        <div>
            <Button onClick={handleEditClick}>Editar Texto</Button>
            <ModalAddText
                opened={editing}
                modalId="textConfiguratorEditor"
                handleClose={handleModalClose}
                isEditing={true}
                editingInitialContent={data.rawContent}
                editComplete={handleEditComplete}
            />
        </div>
    );
};

export default TextConfigurator;
