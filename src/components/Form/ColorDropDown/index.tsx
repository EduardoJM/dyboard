import React, { useState } from 'react';

import { Container, ButtonArea } from './styles';

import Modal from '../../Modal';
import ColorPanel from '../ColorPanel';
import Button from '../Button';

interface ColorDropDownProps {
    color: string;
    text: string;
    onSubmit: (color: string) => void;
}

const ColorDropDown: React.FC<ColorDropDownProps> = ({
    color,
    text,
    onSubmit
}) => {
    const [newColor, setNewColor] = useState(color);
    // dropDown state
    const [visible, setVisible] = useState(false);

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
                title="Alterar Cor"
                closeModalRequest={handleCloseModal}
                visible={visible}
                width={356}
                height={280}
            >
                <ColorPanel
                    color={newColor}
                    changeColor={setNewColor}
                    oldColor={color}
                />
                <ButtonArea>
                    <Button onClick={handleSubmit}>Aplicar</Button>
                </ButtonArea>
            </Modal>
        </Container>
    );
};

export default ColorDropDown;
