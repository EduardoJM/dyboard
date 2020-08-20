export interface ToolBarObjectItem {
    id: string;
    title: string;
    tool: string;
    deep: boolean;
    goToId?: number;
}

const toolBarData: ToolBarObjectItem[][] = [
    [
        {
            id: 'cursor',
            title: 'Cursor',
            tool: 'set-cursor',
            deep: false
        },
        {
            id: 'drag',
            title: 'Mover',
            tool: 'set-drag',
            deep: false
        },
        {
            id: 'resize',
            title: 'Redimensionar',
            tool: 'set-resize',
            deep: false
        },
        {
            id: 'pan',
            title: 'Mover O Quadro',
            tool: 'set-pan',
            deep: false
        },
        {
            id: 'add',
            title: 'Adicionar Elementos',
            tool: 'goto',
            goToId: 1,
            deep: true
        }
    ],
    // add bar
    [
        {
            id: 'parent',
            title: 'Ferramentas',
            tool: 'goto',
            goToId: 0,
            deep: false
        },
        {
            id: 'add-text',
            title: 'Adicionar Texto',
            tool: 'add-text',
            deep: false
        },
        {
            id: 'math',
            title: 'Adicionar Equação LaTeX',
            tool: 'add-math',
            deep: false
        },
        {
            id: 'add-image',
            title: 'Adicionar Imagem',
            tool: 'add-image',
            deep: false
        },
        {
            id: 'plot',
            title: 'Adicionar Área de Plotagem',
            tool: 'add-plot',
            deep: false
        },
        {
            id: '3d-element',
            title: 'Adicionar Elementos Tridimensional',
            tool: 'add-3dspace',
            deep: false
        }
    ]
];

export default toolBarData;
