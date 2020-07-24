import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import katex from 'katex';

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

    // TODO: move all of this from this file to the tex.ts in TextEditor and import here

    // eslint-disable-next-line no-useless-escape
    const inlineLatexRegex = /\\\([\s\S]+?\\\)|\$[\s\S]+?\$/g;
    const stripDollars = (stringToStrip: string) => {
        if (stringToStrip[0] === '$' && stringToStrip[1] !== '$') {
            return stringToStrip.slice(1, -1);
        }
        return stringToStrip.slice(2, -2);
    };

    const renderLatexString = (s: string) => {
        let renderedString;
        try {
            // returns HTML markup
            renderedString = katex.renderToString(s);
        } catch (err) {
            return s;
        }
        return renderedString;
    };

    function renderInlineLaTeX(text: string): string {
        const result: string[] = [];
        const latexMatch = text.match(inlineLatexRegex);
        const stringWithoutLatex = text.split(inlineLatexRegex);
        if (latexMatch) {
            stringWithoutLatex.forEach((s: string, index: number) => {
                result.push(s);
                if (latexMatch[index]) {
                    result.push(renderLatexString(stripDollars(latexMatch[index])));
                }
            });
        } else {
            result.push(text);
        }
        return result.join('');
    }

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
