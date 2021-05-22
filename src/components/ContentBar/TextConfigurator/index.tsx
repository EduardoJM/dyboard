import React from 'react';
// import { RawDraftContentState } from 'draft-js';
import { MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import Button from '../../Form/Button';
// import ModalAddText from '../../../containers/Modals/ModalAddText';

import { TypedElement } from '../../../lib/board';

import { useTheme } from '../../../contexts/theme';

import Container from './styles';

// import { Store } from '../../../redux/reducers/types';
import actions from '../../../redux/actions';

interface TextConfiguratorProps {
    data: TypedElement<'text'>;
}

const TextConfigurator: React.FC<TextConfiguratorProps> = ({ data }) => {
    // const [editing, setEditing] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    // const modalOpened = useSelector((store: Store) => store.modals.editText);

    // TODO: create this component
    // TODO: add i18next translation support

    function handleEditClick() {
        // setEditing(true);
        dispatch(actions.modals.setEditingTextInitialState(data.data.rawContent));
        dispatch(actions.modals.changeModalState('editText', true));
    }

    /*
    function handleEditComplete(state: RawDraftContentState, text: string) {
        setEditing(false);
        const newItem = {
            ...data,
            text,
            rawContent: state
        };
        dispatch(actions.board.updateBoardItem(data, newItem));
    }
    */

    /*
    function handleModalClose(id: ModalsIds) {
        if (id === 'editText') {
            setEditing(false);
        }
    }
    */

    return (
        <>
            <Container theme={theme}>
                <div className="heading">Text Options</div>
                <div className="toolset">
                    <Button
                        buttonType="transparent"
                        onClick={handleEditClick}
                    >
                        <MdEdit />
                    </Button>
                </div>
            </Container>
            {/*
            <ModalAddText
                opened={editing}
                modalId="editText"
                handleClose={handleModalClose}
                isEditing={true}
                editingInitialContent={data.rawContent}
                editComplete={handleEditComplete}
            />
            */}
        </>
    );
};

export default TextConfigurator;
