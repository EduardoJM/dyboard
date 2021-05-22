// import { Action as ReduxAction } from 'redux';
import { RawDraftContentState } from 'draft-js';
import { Element } from '../../lib/board';
import { DominantTool } from '../../data/tools';

/*
export interface BoardAction extends ReduxAction {
    boardItem?: ElementAll;
    oldItem?: ElementAll;
    index?: number;
    boardItemsCollection?: ElementsCollection;
}
*/

export interface BoardStore {
    elements: Element[];
    currentElement: Element | null;
}

export const BoardStoreInitial : BoardStore = {
    elements: [],
    currentElement: null
};

/*
export interface ToolsAction extends ReduxAction {
    tool?: DominantTool;
    element?: ElementAll | null;
}
*/

export interface ToolsStore {
    tool: DominantTool;
    elementToAdd: Element | null;
}

export const ToolsStoreInitial : ToolsStore = {
    tool: 'cursor',
    elementToAdd: null
};
/*
export type ModalsIds = 'addImage' | 'addLaTeX' | 'addText';

export interface ModalsAction extends ReduxAction {
    id: ModalsIds;
    visible: boolean;
}
*/

export interface ModalsStore {
    addImage: boolean;
    addLaTeX: boolean;
    addText: boolean;
    editText: boolean;
    editTextInitialState: RawDraftContentState;
}

export const ModalsStoreInitial : ModalsStore = {
    addImage: false,
    addLaTeX: false,
    addText: false,
    editText: false,
    editTextInitialState: {
        blocks: [],
        entityMap: {}
    }
};

export interface Store {
    board: BoardStore;
    tools: ToolsStore;
    modals: ModalsStore;
};
