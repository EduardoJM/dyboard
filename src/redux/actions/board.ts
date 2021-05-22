import { Action as ReduxAction } from 'redux';
import { Element } from '../../lib/board';

export type BoardActionType = 'ADD_BOARD_ITEM' |
    'UPDATE_BOARD_ITEM' |
    'SET_BOARD_ITEMS' |
    'SET_SELECTION';

export interface BoardActionTypePayloadMap {
    ADD_BOARD_ITEM: Element;
    UPDATE_BOARD_ITEM: {
        oldItem: Element;
        boardItem: Element;
    };
    SET_SELECTION: Element;
    SET_BOARD_ITEMS: Element[];
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
    setBoardItems: (items: Element[]): BoardAction => {
        return {
            type: 'SET_BOARD_ITEMS',
            payload: items
        };
    },
    addBoardItem: (item: Element): BoardAction => {
        return {
            type: 'ADD_BOARD_ITEM',
            payload: item
        };
    },
    setSelection: (item: Element): BoardAction => {
        return {
            type: 'SET_SELECTION',
            payload: item
        };
    },
    updateBoardItem: (oldItem: Element, newItem: Element): BoardAction => {
        return {
            type: 'UPDATE_BOARD_ITEM',
            payload: {
                oldItem,
                boardItem: newItem
            }
        };
    }
};
