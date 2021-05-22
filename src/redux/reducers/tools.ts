import { ToolsStore, ToolsStoreInitial } from './types';
import { ToolsAction } from '../actions';

export default function toolsReducer(
    state: ToolsStore = ToolsStoreInitial,
    action: ToolsAction
): ToolsStore {
    if (action.type === 'SET_CURRENT_TOOL') {
        return {
            ...state,
            tool: action.payload
        };
    } else if (action.type === 'SET_ELEMENT_TO_ADD') {
        return {
            ...state,
            elementToAdd: action.payload
        };
    }
    return state;
}
