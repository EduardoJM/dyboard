import { ToolsStore, ToolsStoreInitial, ToolsAction } from './types';

export default function toolsReducer(
    state: ToolsStore = ToolsStoreInitial,
    action: ToolsAction
): ToolsStore {
    if (action.type === 'SET_CURRENT_TOOL') {
        if (!action.tool) {
            return state;
        }
        return {
            ...state,
            tool: action.tool
        };
    } else if (action.type === 'SET_ELEMENT_TO_ADD') {
        if (action.element === undefined) {
            return {
                ...state,
                elementToAdd: null
            };
        }
        return {
            ...state,
            elementToAdd: action.element
        };
    }
    return state;
}
