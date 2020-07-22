import React, { useState } from 'react';
import Modal from '../../components/Modal';
import ModalProps from '../interfaces';

import { useTools } from '../../contexts/tools';

import {
    Form,
    TextWriter,
    TextEditor,
    ButtonArea,
    Viewer
} from './styles';
import Switch from '../../components/Form/Switch';
import Button from '../../components/Form/Button';
import Latex from '../../components/Latex';

const ModalAddText: React.FC<ModalProps> = ({
    opened,
    modalId,
    handleClose
}) => {
    const [supportLatex, setSupportLatex] = useState(true);
    const [supportMarkdown, setSupportMarkdown] = useState(false);
    const [text, setText] = useState('');

    const tools = useTools();

    function handleAdd() {
        const item = {
            id: Date.now(),
            type: 'text',
            width: 300,
            height: 150,
            left: 0,
            top: 0,
            text,
            supportLatex,
            markdown: supportMarkdown
        };
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
                <Switch
                    text="Suporte para LaTeX"
                    checked={supportLatex}
                    handleCheckChange={(value) => setSupportLatex(value)}
                />
                <Switch
                    text="Suporte para Markdown"
                    checked={supportMarkdown}
                    handleCheckChange={(value) => setSupportMarkdown(value)}
                />
                <TextWriter>
                    <div>
                        <span className="title">Escreva</span>
                        <TextEditor
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div>
                        <span className="title">Visualize</span>
                        <Viewer>
                            <Latex throwOnError={false}>{text}</Latex>
                        </Viewer>
                    </div>
                </TextWriter>
                <ButtonArea>
                    <Button onClick={handleAdd}>Adicionar</Button>
                </ButtonArea>
            </Form>
        </Modal>
    );
};

export default ModalAddText;
