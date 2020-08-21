import React, { useState } from 'react';
import { RawDraftContentState } from 'draft-js';
import { MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import Button from '../../Form/Button';
import ModalAddText from '../../../containers/Modals/ModalAddText';

import { ElementText } from '../../../data/board';

import { useTheme } from '../../../contexts/theme';

import Container from './styles';

interface TextConfiguratorProps {
    data: ElementText;
}

const TextConfigurator: React.FC<TextConfiguratorProps> = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    // TODO: create this component
    // TODO: add i18next translation support

    function handleEditClick() {
        setEditing(true);
    }

    function handleEditComplete(state: RawDraftContentState, text: string) {
        setEditing(false);
        const newItem = {
            ...data,
            text,
            rawContent: state
        };
        dispatch({ type: 'UPDATE_BOARD_ITEM', boardItem: newItem, oldItem: data });
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
