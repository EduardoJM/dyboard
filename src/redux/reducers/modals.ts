import { ModalsStore, ModalsStoreInitial, ModalsAction } from './types';

export default function modalsReducer(
    state: ModalsStore = ModalsStoreInitial,
    action: ModalsAction
): ModalsStore {
    if (action.type === 'CHANGE_MODAL') {
        return {
            ...state,
            [action.id]: action.visible
        };
    }
    return state;
}
