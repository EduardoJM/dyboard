import React, { useState } from 'react';
import { RawDraftContentState } from 'draft-js';
import { MdEdit } from 'react-icons/md';

import Button from '../../Form/Button';
import ModalAddText from '../../../modals/ModalAddText';

import { ElementText } from '../../../data/board';

import { useBoard } from '../../../contexts/board';
import { useTools } from '../../../contexts/tools';
import { useTheme } from '../../../contexts/theme';

import Container from './styles';

interface TextConfiguratorProps {
    data: ElementText;
}

const TextConfigurator: React.FC<TextConfiguratorProps> = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const board = useBoard();
    const tools = useTools();
    const theme = useTheme();
    // TODO: create this component
    // TODO: add i18next translation support

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
        <>
            <Container theme={theme}>
                <div className="heading">Text Options</div>
                <div className="toolset">
                    <Button
                        buttonType="transparent"
                        onClick={handleEditClick}
                    >
                        <MdEdit />
                    </Button>
                </div>
            </Container>
            <ModalAddText
                opened={editing}
                modalId="textConfiguratorEditor"
                handleClose={handleModalClose}
                isEditing={true}
                editingInitialContent={data.rawContent}
                editComplete={handleEditComplete}
            />
        </>
    );
};

export default TextConfigurator;
