import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Store } from '../../redux/reducers/types';
import actions from '../../redux/actions';

import ModalAddText from './ModalAddText';
import ModalAddImage from './ModalAddImage';
import ModalAddLaTeX from './ModalAddLaTeX';

const Modals: React.FC = () => {
    const modalStates = useSelector((state: Store) => state.modals);
    const dispatch = useDispatch();

    function handleCloseModal(id: string) {
        dispatch(actions.modals.changeModal(id, false));
    }

    return (
        <>
            <ModalAddText
                modalId="addText"
                opened={modalStates.addText}
                handleClose={handleCloseModal}
            />
            <ModalAddImage
                modalId="addImage"
                opened={modalStates.addImage}
                handleClose={handleCloseModal}
            />
            <ModalAddLaTeX
                modalId="addLaTeX"
                opened={modalStates.addLaTeX}
                handleClose={handleCloseModal}
            />
        </>
    );
};

export default Modals;
