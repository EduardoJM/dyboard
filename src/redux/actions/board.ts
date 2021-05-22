import { Action as ReduxAction } from 'redux';
import { ElementAll, ElementsCollection } from '../../data/board';

export type BoardActionType = 'ADD_BOARD_ITEM' |
    'UPDATE_BOARD_ITEM' |
    'SET_BOARD_ITEMS' |
    'SET_SELECTION';

export interface BoardActionTypePayloadMap {
    ADD_BOARD_ITEM: ElementAll;
    UPDATE_BOARD_ITEM: {
        oldItem: ElementAll;
        boardItem: ElementAll;
    };
    SET_SELECTION: ElementAll;
    SET_BOARD_ITEMS: ElementsCollection;
}

export interface BoardActionMaped<K extends keyof BoardActionTypePayloadMap> extends ReduxAction<BoardActionType> {
    type: K;
    payload: BoardActionTypePayloadMap[K];
}

export type BoardAction = BoardActionMaped<'ADD_BOARD_ITEM'> |
    BoardActionMaped<'SET_BOARD_ITEMS'> |
    BoardActionMaped<'SET_SELECTION'> |
    BoardActionMaped<'UPDATE_BOARD_ITEM'>;

export const board = {
    setBoardItems: (items: ElementsCollection): BoardAction => {
        return {
            type: 'SET_BOARD_ITEMS',
            payload: items
        };
    },
    addBoardItem: (item: ElementAll): BoardAction => {
        return {
            type: 'ADD_BOARD_ITEM',
            payload: item
        };
    },
    setSelection: (item: ElementAll): BoardAction => {
        return {
            type: 'SET_SELECTION',
            payload: item
        };
    },
    updateBoardItem: (oldItem: ElementAll, newItem: ElementAll): BoardAction => {
        return {
            type: 'UPDATE_BOARD_ITEM',
            payload: {
                oldItem,
                boardItem: newItem
            }
        };
    }
};
