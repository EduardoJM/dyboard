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
    } else if (action.type === 'SET_EDITING_TEXT_INITIAL_STATE') {
        return {
            ...state,
            editTextInitialState: action.payload
        };
    }
    return state;
}
