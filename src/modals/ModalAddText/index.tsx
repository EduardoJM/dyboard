import React, { useState } from 'react';
import {
    EditorState,
    RawDraftContentState,
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import katex from 'katex';
import { useTranslation } from 'react-i18next';

import { renderInlineLaTeX } from '../../core/latex';
import Modal from '../../components/Modal';

import { useTools } from '../../contexts/tools';

import {
    Form,
    ButtonArea
} from './styles';

import Button from '../../components/Form/Button';
import TextEditor from '../../components/Form/TextEditor';

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
        let text = stateToHTML(contentState, {
            blockRenderers: {
                atomic: (block) => {
                    const tex = contentState
                        .getEntity(block.getEntityAt(0))
                        .getData().content;
                    return katex.renderToString(tex, { displayMode: true });
                }
            }
        });
        text = renderInlineLaTeX(text);
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
