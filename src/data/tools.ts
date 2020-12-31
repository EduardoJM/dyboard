export interface ToolBarObjectItem {
    id: string;
    tool: string;
    deep: boolean;
    goToId?: number;
}

export const toolBarData: ToolBarObjectItem[][] = [
    [
        {
            id: 'cursor',
            tool: 'set-cursor',
            deep: false
        },
        {
            id: 'drag',
            tool: 'set-drag',
            deep: false
        },
        {
            id: 'resize',
            tool: 'set-resize',
            deep: false
        },
        {
            id: 'pan',
            tool: 'set-pan',
            deep: false
        },
        {
            id: 'add',
            tool: 'goto',
            goToId: 1,
            deep: true
        }
    ],
    // add bar
    [
        {
            id: 'parent',
            tool: 'goto',
            goToId: 0,
            deep: false
        },
        {
            id: 'add-text',
            tool: 'add-text',
            deep: false
        },
        {
            id: 'math',
            tool: 'add-math',
            deep: false
        },
        {
            id: 'add-image',
            tool: 'add-image',
            deep: false
        },
        {
            id: 'plot',
            tool: 'add-plot',
            deep: false
        },
        {
            id: 'hand-pen',
            tool: 'add-hand-pen',
            deep: false
        }
    ]
];

export type DominantTool = 'cursor' | 'drag' | 'resize' | 'pan';
