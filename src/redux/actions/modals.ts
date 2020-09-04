import ActionType from './ActionType';
import { ModalsAction, ModalsIds } from '../reducers/types';

const changeModal = (id: string, visible: boolean): ModalsAction => {
    const modalId = id as ModalsIds;
    return {
        type: ActionType.modals.CHANGE_MODAL,
        id: modalId,
        visible
    };
};

export default {
    changeModal
};
