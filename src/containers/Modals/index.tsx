import React from 'react';

import ModalAddText from './ModalAddText';
import ModalAddImage from './ModalAddImage';
import ModalAddLaTeX from './ModalAddLaTeX';

const Modals: React.FC = () => {
    return (
        <>
            <ModalAddText
                modalId="addText"
            />
            <ModalAddImage
                modalId="addImage"
            />
            <ModalAddLaTeX
                modalId="addLaTeX"
            />
            <ModalAddText
                modalId="editText"
                isEditing={true}
            />
        </>
    );
};

export default Modals;
