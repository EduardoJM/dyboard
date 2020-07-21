import React from 'react';
import Modal from '../components/Modal';
import ModalProps from './interfaces';

const ModalAddText: React.FC<ModalProps> = ({
    opened,
    modalId,
    handleClose
}) => {
    return (
        <Modal
            visible={opened}
            title="Adicionar Texto"
            closeModalRequest={() => handleClose(modalId)}
        >
            Adicionar novo texto!
        </Modal>
    );
};

export default ModalAddText;
