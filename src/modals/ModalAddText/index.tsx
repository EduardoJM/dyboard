import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import Modal from '../../components/Modal';
import ModalProps from '../interfaces';

import { useTools } from '../../contexts/tools';

import {
    Form,
    ButtonArea
} from './styles';

import Button from '../../components/Form/Button';
import TextEditor from '../../components/Form/TextEditor';

const ModalAddText: React.FC<ModalProps> = ({
    opened,
    modalId,
    handleClose
}) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty()
    );

    const tools = useTools();

    function handleAdd() {
        const contentState = editorState.getCurrentContent();
        const text = stateToHTML(contentState);
        const item = {
            id: Date.now(),
            type: 'text',
            width: 300,
            height: 150,
            left: 0,
            top: 0,
            text
        };
        setEditorState(EditorState.createEmpty());
        tools.setCatchClick(item);
        handleClose(modalId);
    }

    return (
        <Modal
            visible={opened}
            title="Adicionar Texto"
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
                    <Button onClick={handleAdd}>Adicionar</Button>
                </ButtonArea>
            </Form>
        </Modal>
    );
};

export default ModalAddText;
