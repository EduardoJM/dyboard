import React, { useState } from 'react';
import Modal from '../../components/Modal';
import ModalProps from '../interfaces';

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
    const [text, setText] = useState('');

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
                    <Button>Adicionar</Button>
                </ButtonArea>
            </Form>
        </Modal>
    );
};

export default ModalAddText;
