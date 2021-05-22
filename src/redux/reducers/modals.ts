import { ModalsStore, ModalsStoreInitial } from './types';
import { ModalsAction } from '../actions';

export default function modalsReducer(
    state: ModalsStore = ModalsStoreInitial,
    action: ModalsAction
): ModalsStore {
    if (action.type === 'CHANGE_MODAL_STATE') {
        return {
            ...state,
            [action.payload.modalId]: action.payload.opened
        };
    }
    return state;
}
