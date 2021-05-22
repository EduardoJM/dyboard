import React, { useState, useEffect } from 'react';
import {
    EditorState,
    RawDraftContentState,
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Store } from '../../../redux/reducers/types';
import actions, { ModalsIds } from '../../../redux/actions';

import { stateToHTML } from '../../../utils/draft';
import Modal from '../../../components/Modal';

import {
    Form,
    ButtonArea
} from './styles';

import Button from '../../../components/Form/Button';
import TextEditor from './TextEditor';

interface ModalAddTextProps {
    modalId: ModalsIds;
    isEditing?: boolean;
}

const ModalAddText: React.FC<ModalAddTextProps> = ({
    modalId,
    isEditing
}) => {
    const [editorState, setEditorState] = useState(
        () => isEditing && editingInitialContent
            ? EditorState.createWithContent(convertFromRaw(editingInitialContent))
            : EditorState.createEmpty()
    );
    const { t } = useTranslation('modals');
    const opened = useSelector((store: Store) => store.modals[modalId]);
    const editingInitialContent = useSelector((store: Store) => store.modals.editTextInitialState);
    const dispatch = useDispatch();

    useEffect(() => {
        setEditorState(
            () => isEditing && editingInitialContent
                ? EditorState.createWithContent(convertFromRaw(editingInitialContent))
                : EditorState.createEmpty()
        );
    }, [isEditing, editingInitialContent]);

    function handleClose() {
        dispatch(actions.modals.changeModalState(modalId, false));
    }

    function handleEditComplete(content: RawDraftContentState, text: string) {
        /*
        const newItem = {
            ...data,
            text,
            rawContent: state
        };
        dispatch(actions.board.updateBoardItem(data, newItem));
        */
        console.log(text);
        console.log('NOT IMPLEMENTED YET!');
        handleClose();
    }

    function handleAdd() {
        const contentState = editorState.getCurrentContent();
        const text = stateToHTML(contentState);
        if (isEditing) {
            handleEditComplete(convertToRaw(contentState), text);
            return;
        }
        setEditorState(EditorState.createEmpty());
        dispatch(actions.tools.setElementToAdd({
            id: Date.now(),
            type: 'text',
            width: 300,
            height: 150,
            left: 0,
            top: 0,
            text,
            rawContent: convertToRaw(contentState)
        }));
        handleClose();
    }

    return (
        <Modal
            visible={opened}
            title={isEditing ? t('text.edit.title') : t('text.add.title')}
            closeModalRequest={() => handleClose()}
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
