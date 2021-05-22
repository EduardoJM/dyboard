import { Action as ReduxAction } from 'redux';
import { Element } from '../../lib/board';
import { DominantTool } from '../../data/tools';

export type ToolsActionType = 'SET_ELEMENT_TO_ADD' | 'SET_CURRENT_TOOL';

export interface ToolsActionTypePayloadMap {
    SET_ELEMENT_TO_ADD: Element | null;
    SET_CURRENT_TOOL: DominantTool;
}

export interface ToolsActionMaped<K extends keyof ToolsActionTypePayloadMap> extends ReduxAction<ToolsActionType> {
    type: K;
    payload: ToolsActionTypePayloadMap[K];
}

export type ToolsAction = ToolsActionMaped<'SET_ELEMENT_TO_ADD'> | ToolsActionMaped<'SET_CURRENT_TOOL'>;

export const tools = {
    setElementToAdd: (item: Element | null): ToolsAction => {
        return {
            type: 'SET_ELEMENT_TO_ADD',
            payload: item
        };
    },
    setCurrentTool: (tool: DominantTool): ToolsAction => {
        return {
            type: 'SET_CURRENT_TOOL',
            payload: tool
        };
    }
};
