import { Action as ReduxAction } from 'redux';
import { RawDraftContentState } from 'draft-js';

export type ModalsActionTypes = 'CHANGE_MODAL_STATE' | 'SET_EDITING_TEXT_INITIAL_STATE';

export type ModalsIds = 'addImage' | 'addLaTeX' | 'addText' | 'editText';

export interface ModalsActionTypePayloadMap {
    'CHANGE_MODAL_STATE': {
        modalId: ModalsIds;
        opened: boolean;
    };
    'SET_EDITING_TEXT_INITIAL_STATE': RawDraftContentState;
}

export interface ModalsActionMaped<K extends keyof ModalsActionTypePayloadMap> extends ReduxAction<ModalsActionTypes> {
    type: K;
    payload: ModalsActionTypePayloadMap[K];
}

export type ModalsAction = ModalsActionMaped<'CHANGE_MODAL_STATE'> |
    ModalsActionMaped<'SET_EDITING_TEXT_INITIAL_STATE'>;

export const modals = {
    changeModalState: (modalId: ModalsIds, opened: boolean): ModalsAction => {
        return {
            type: 'CHANGE_MODAL_STATE',
            payload: { modalId, opened }
        };
    },
    setEditingTextInitialState: (state: RawDraftContentState): ModalsAction => {
        return {
            type: 'SET_EDITING_TEXT_INITIAL_STATE',
            payload: state
        };
    }
};
