import { Action as ReduxAction } from 'redux';

export type ModalsActionTypes = 'CHANGE_MODAL_STATE';

export type ModalsIds = 'addImage' | 'addLaTeX' | 'addText';

export interface ModalsActionTypePayloadMap {
    'CHANGE_MODAL_STATE': {
        modalId: ModalsIds;
        opened: boolean;
    };
}

export interface ModalsActionMaped<K extends keyof ModalsActionTypePayloadMap> extends ReduxAction<ModalsActionTypes> {
    type: K;
    payload: ModalsActionTypePayloadMap[K];
}

export type ModalsAction = ModalsActionMaped<'CHANGE_MODAL_STATE'>;

export const modals = {
    changeModalState: (modalId: ModalsIds, opened: boolean): ModalsAction => {
        return {
            type: 'CHANGE_MODAL_STATE',
            payload: { modalId, opened }
        };
    }
};
