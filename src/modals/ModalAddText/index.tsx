import React, { useState } from 'react';
import {
    EditorState,
    RawDraftContentState,
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import { useTranslation } from 'react-i18next';

import { stateToHTML } from '../../utils/draft';
import Modal from '../../components/Modal';

import { useTools } from '../../contexts/tools';

import {
    Form,
    ButtonArea
} from './styles';

import Button from '../../components/Form/Button';
import TextEditor from './TextEditor';

interface ModalAddTextProps {
    opened: boolean;
    modalId: string;
    handleClose: (id: string) => void;
    isEditing?: boolean;
    editingInitialContent?: RawDraftContentState;
    editComplete?: (state: RawDraftContentState, text: string) => void;
}

const ModalAddText: React.FC<ModalAddTextProps> = ({
    opened,
    modalId,
    handleClose,
    isEditing,
    editingInitialContent,
    editComplete
}) => {
    const [editorState, setEditorState] = useState(
        () => isEditing && editingInitialContent
            ? EditorState.createWithContent(convertFromRaw(editingInitialContent))
            : EditorState.createEmpty()
    );
    const { t } = useTranslation('modals');
    const tools = useTools();

    function handleAdd() {
        const contentState = editorState.getCurrentContent();
        const text = stateToHTML(contentState);
        if (isEditing && editComplete) {
            editComplete(convertToRaw(contentState), text);
            return;
        }
        const item = {
            id: Date.now(),
            type: 'text',
            width: 300,
            height: 150,
            left: 0,
            top: 0,
            text,
            rawContent: convertToRaw(contentState)
        };
        setEditorState(EditorState.createEmpty());
        tools.setCatchClick(item);
        handleClose(modalId);
    }

    return (
        <Modal
            visible={opened}
            title={isEditing ? t('text.edit.title') : t('text.add.title')}
            closeModalRequest={() => handleClose(modalId)}
        >
            <Form>
                <div className="editor-container">
                    <TextEditor
                        editorState={editorState}
                        setEditorState={setEditorState}
                    />
                </div>
                <ButtonArea>
                    <Button onClick={handleAdd}>
                        {isEditing ? t('text.edit.button') : t('text.add.button')}
                    </Button>
                </ButtonArea>
            </Form>
        </Modal>
    );
};

export default ModalAddText;
