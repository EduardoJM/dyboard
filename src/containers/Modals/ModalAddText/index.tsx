import React, { useState, useEffect } from 'react';
import {
    EditorState,
    RawDraftContentState,
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { stateToHTML } from '../../../utils/draft';
import Modal from '../../../components/Modal';

import {
    Form,
    ButtonArea
} from './styles';

import Button from '../../../components/Form/Button';
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
    const dispatch = useDispatch();

    useEffect(() => {
        setEditorState(
            () => isEditing && editingInitialContent
                ? EditorState.createWithContent(convertFromRaw(editingInitialContent))
                : EditorState.createEmpty()
        );
    }, [isEditing, editingInitialContent]);

    function handleAdd() {
        const contentState = editorState.getCurrentContent();
        const text = stateToHTML(contentState);
        if (isEditing && editComplete) {
            editComplete(convertToRaw(contentState), text);
            return;
        }
        setEditorState(EditorState.createEmpty());
        dispatch({
            type: 'SET_ELEMENT_TO_ADD',
            element: {
                id: Date.now(),
                type: 'text',
                width: 300,
                height: 150,
                left: 0,
                top: 0,
                text,
                rawContent: convertToRaw(contentState)
            }
        });
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
