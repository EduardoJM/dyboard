import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container, ButtonArea } from './styles';

import Modal from '../../Modal';
import ColorPanel from './ColorPanel';
import Button from '../Button';

interface ColorPickerProps {
    color: string;
    text: string;
    onSubmit: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    color,
    text,
    onSubmit
}) => {
    const [newColor, setNewColor] = useState(color);
    // dropDown state
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation('modals');

    function handleSubmit() {
        setVisible(false);
        onSubmit(newColor);
    }

    function handleCloseModal() {
        setVisible(false);
    }

    return (
        <Container>
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
