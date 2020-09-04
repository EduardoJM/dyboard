import ActionType from './ActionType';
import { ToolsAction } from '../reducers/types';
import { ElementAll } from '../../data/board';
import { DominantTool } from '../../data/tools';

const setElementToAdd = (item: ElementAll | null): ToolsAction => {
    return {
        type: ActionType.tools.SET_ELEMENT_TO_ADD,
        element: item
    };
};

const setCurrentTool = (tool: DominantTool): ToolsAction => {
    return {
        type: ActionType.tools.SET_CURRENT_TOOL,
        tool
    };
};

export default {
    setElementToAdd,
    setCurrentTool
};
