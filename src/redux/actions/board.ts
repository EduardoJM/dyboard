import ActionType from './ActionType';
import { BoardAction } from '../reducers/types';
import { ElementAll, ElementsCollection } from '../../data/board';

const setBoardItems = (items: ElementsCollection): BoardAction => {
    return {
        type: ActionType.board.SET_BOARD_ITEMS,
        boardItemsCollection: items
    };
};

const addBoardItem = (item: ElementAll): BoardAction => {
    return {
        type: ActionType.board.ADD_BOARD_ITEM,
        boardItem: item
    };
};

const setSelection = (item: ElementAll): BoardAction => {
    return {
        type: ActionType.board.SET_SELECTION,
        boardItem: item
    };
};

const updateBoardItem = (oldItem: ElementAll, newItem: ElementAll): BoardAction => {
    return {
        type: ActionType.board.UPDATE_BOARD_ITEM,
        oldItem,
        boardItem: newItem
    };
};

export default {
    setBoardItems,
    addBoardItem,
    setSelection,
    updateBoardItem
};
