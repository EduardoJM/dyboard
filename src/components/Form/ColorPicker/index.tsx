import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from '@unform/core';

import { Container, ButtonArea } from './styles';

import Modal from '../../Modal';
import ColorPanel from './ColorPanel';
import Button from '../Button';

interface ColorPickerProps {
    name: string;
    color: string;
    text: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    name,
    color,
    text
}) => {
    const pickerRef = useRef(null);
    const { fieldName, registerField } = useField(name);
    const [newColor, setNewColor] = useState(color);
    // dropDown state
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation('modals');

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: pickerRef.current,
            path: 'data-color'
        });
    }, [fieldName, registerField]);

    function handleSubmit() {
        setVisible(false);
        setNewColor(newColor);
    }

    function handleCloseModal() {
        setVisible(false);
    }

    return (
        <Container
            ref={pickerRef}
            data-color={newColor}
        >
            <div
                onClick={() => setVisible(true)}
            >
                <span>{text}</span>
                <div className="color-box" style={{
                    backgroundColor: color
                }} />
            </div>
            <Modal
                title={t('color.title')}
                closeModalRequest={handleCloseModal}
                visible={visible}
                width={400}
                height={280}
            >
                <ColorPanel
                    color={newColor}
                    changeColor={setNewColor}
                    oldColor={color}
                />
                <ButtonArea>
                    <Button onClick={handleSubmit}>{t('color.button')}</Button>
                </ButtonArea>
            </Modal>
        </Container>
    );
};

export default ColorPicker;
