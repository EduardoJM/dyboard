import { BoardStore, BoardStoreInitial } from './types';
import { BoardAction } from '../actions';

export default function boardReducer(
    state: BoardStore = BoardStoreInitial,
    action: BoardAction
): BoardStore {
    if (action.type === 'ADD_BOARD_ITEM') {
        return {
            ...state,
            elements: [
                ...state.elements,
                action.payload
            ]
        };
    } else if (action.type === 'UPDATE_BOARD_ITEM') {
        const isSelected = state.currentElement === action.payload.oldItem;
        return {
            ...state,
            elements: state.elements.map((item) => {
                if (!action.payload.boardItem) {
                    return item;
                }
                if (action.payload.oldItem === item) {
                    return action.payload.boardItem;
                }
                return item;
            }),
            currentElement: isSelected ? action.payload.boardItem : state.currentElement
        };
    } else if (action.type === 'SET_BOARD_ITEMS') {
        const selection = state.currentElement
            ? action.payload.indexOf(state.currentElement)
            : -1;
        return {
            ...state,
            elements: action.payload,
            currentElement: (selection >= 0) ? action.payload[selection] : null
        };
    } else if (action.type === 'SET_SELECTION') {
        return {
            ...state,
            currentElement: action.payload
        };
    }
    return state;
}
