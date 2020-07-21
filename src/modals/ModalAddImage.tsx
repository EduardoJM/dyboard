import React from 'react';
import Modal from '../components/Modal';
import ModalProps from './interfaces';

const ModalAddImage: React.FC<ModalProps> = ({
    opened,
    modalId,
    handleClose
}) => {
    return (
        <Modal
            visible={opened}
            title="Adicionar Imagem"
            closeModalRequest={() => handleClose(modalId)}
        >
            Adicionar nova Imagem!
        </Modal>
    );
};

export default ModalAddImage;
