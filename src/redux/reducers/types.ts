import { Action as ReduxAction } from 'redux';
import {
    ElementAll,
    ElementsCollection
} from '../../data/board';
import { DominantTool } from '../../data/tools';

export interface BoardAction extends ReduxAction {
    boardItem?: ElementAll;
    oldItem?: ElementAll;
    index?: number;
    boardItemsCollection?: ElementsCollection;
}

export interface BoardStore {
    elements: ElementsCollection;
    currentElement: ElementAll | null;
}

export const BoardStoreInitial : BoardStore = {
    elements: [],
    currentElement: null
};

export interface ToolsAction extends ReduxAction {
    tool?: DominantTool;
    element?: ElementAll | null;
}

export interface ToolsStore {
    tool: DominantTool;
    elementToAdd: ElementAll | null;
}

export const ToolsStoreInitial : ToolsStore = {
    tool: 'cursor',
    elementToAdd: null
};

export interface ModalsAction extends ReduxAction {
    id: 'addImage' | 'addLaTeX' | 'addText';
    visible: boolean;
}

export interface ModalsStore {
    addImage: false,
    addLaTeX: false,
    addText: false,
}

export const ModalsStoreInitial : ModalsStore = {
    addImage: false,
    addLaTeX: false,
    addText: false
};

export interface Store {
    board: BoardStore;
    tools: ToolsStore;
    modals: ModalsStore;
};
