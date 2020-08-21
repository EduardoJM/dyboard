import { BoardStore, BoardStoreInitial, BoardAction } from './types';

export default function boardReducer(
    state: BoardStore = BoardStoreInitial,
    action: BoardAction
): BoardStore {
    if (action.type === 'ADD_BOARD_ITEM') {
        if (!action.boardItem) {
            return state;
        }
        return {
            ...state,
            elements: [
                ...state.elements,
                action.boardItem
            ]
        };
    } else if (action.type === 'UPDATE_BOARD_ITEM') {
        if (!action.boardItem) {
            return state;
        }
        if (action.index !== undefined) {
            const isSelected = state.currentElement
                ? (state.elements.indexOf(state.currentElement) === action.index)
                : false;
            return {
                ...state,
                elements: state.elements.map((item, index) => {
                    if (action.index === undefined || !action.boardItem) {
                        return item;
                    }
                    if (index === action.index) {
                        return action.boardItem;
                    }
                    return item;
                }),
                currentElement: isSelected ? action.boardItem : state.currentElement
            };
        } else if (action.oldItem) {
            const isSelected = state.currentElement === action.oldItem;
            return {
                ...state,
                elements: state.elements.map((item) => {
                    if (!action.boardItem) {
                        return item;
                    }
                    if (action.oldItem === item) {
                        return action.boardItem;
                    }
                    return item;
                }),
                currentElement: isSelected ? action.boardItem : state.currentElement
            };
        }
        return state;
    } else if (action.type === 'SET_BOARD_ITEMS') {
        if (!action.boardItemsCollection) {
            return state;
        }
        const selection = state.currentElement
            ? action.boardItemsCollection.indexOf(state.currentElement)
            : -1;
        return {
            ...state,
            elements: action.boardItemsCollection,
            currentElement: (selection >= 0) ? action.boardItemsCollection[selection] : null
        };
    } else if (action.type === 'SET_SELECTION') {
        if (!action.boardItem) {
            return state;
        }
        return {
            ...state,
            currentElement: action.boardItem
        };
    }
    return state;
}
