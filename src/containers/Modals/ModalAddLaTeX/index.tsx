import React, { useState, useEffect, ChangeEvent } from 'react';
import Katex from 'katex';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Modal from '../../../components/Modal';

import actions from '../../../redux/actions';

import { LatexEditor, ButtonArea } from './styles';

import Button from '../../../components/Form/Button';

interface ModalAddLaTeXProps {
    opened: boolean;
    modalId: string;
    handleClose: (id: string) => void;
    isEditing?: boolean;
    editingInitialContent?: string;
    editComplete?: (text: string) => void;
}

const render = (text: string) => {
    let output = '';
    try {
        output = Katex.renderToString(text, { displayMode: true });
    } catch (err) {
        output = 'Invalid TeX!';
    }
    return output;
};

const ModalAddLaTeX: React.FC<ModalAddLaTeXProps> = ({
    opened,
    modalId,
    handleClose,
    isEditing,
    editingInitialContent,
    editComplete
}) => {
    const [text, setText] = useState(
        () => isEditing && editingInitialContent
            ? editingInitialContent
            : ''
    );
    const [mathText, setMathText] = useState(
        () => isEditing && editingInitialContent
            ? render(editingInitialContent)
            : ''
    );
    const { t } = useTranslation('modals');
    const dispatch = useDispatch();

    useEffect(() => {
        setText(
            () => isEditing && editingInitialContent
                ? editingInitialContent
                : ''
        );
        setMathText(
            () => isEditing && editingInitialContent
                ? render(editingInitialContent)
                : ''
        );
    }, [isEditing, editingInitialContent]);

    function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setText(e.target.value);
        setMathText(render(e.target.value));
    }

    function handleAdd() {
        if (isEditing && editComplete) {
            editComplete(text);
            return;
        }
        setText('');
        dispatch(actions.tools.setElementToAdd({
            id: Date.now(),
            type: 'latex',
            width: 300,
            height: 150,
            left: 0,
            top: 0,
            text
        }));
        handleClose(modalId);
    }

    return (
        <Modal
            visible={opened}
            title={isEditing ? t('latex.edit.title') : t('latex.add.title')}
            closeModalRequest={() => handleClose(modalId)}
        >
            <LatexEditor>
                <textarea onChange={handleTextAreaChange} value={text}></textarea>
                <div className="preview">
                    <div
                        className="preview-content"
                        dangerouslySetInnerHTML={{
                            __html: mathText
                        }}
                    />
                </div>
                <ButtonArea>
                    <Button onClick={handleAdd}>
                        {isEditing ? t('latex.edit.button') : t('latex.add.button')}
                    </Button>
                </ButtonArea>
            </LatexEditor>
        </Modal>
    );
};

export default ModalAddLaTeX;
