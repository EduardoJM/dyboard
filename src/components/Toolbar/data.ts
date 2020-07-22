export interface ToolBarObjectItem {
    id: string;
    title: string;
    tool: string;
    goToId?: number;
}

const toolBarData: ToolBarObjectItem[][] = [
    [
        {
            id: 'cursor',
            title: 'Cursor',
            tool: 'none'
        },
        {
            id: 'add',
            title: 'Adicionar Elementos',
            tool: 'goto',
            goToId: 1
        }
    ],
    // add bar
    [
        {
            id: 'parent',
            title: 'Ferramentas',
            tool: 'goto',
            goToId: 0
        },
        {
            id: 'add-text',
            title: 'Adicionar Texto',
            tool: 'add-text'
        },
        {
            id: 'add-image',
            title: 'Adicionar Imagem',
            tool: 'add-image'
        },
        {
            id: '3d-element',
            title: 'Adicionar Elementos Tridimensional',
            tool: 'goto',
            goToId: 2
        }
    ],
    // 3d element
    [
        {
            id: 'parent',
            title: 'Adicionar Elementos',
            tool: 'goto',
            goToId: 1
        },
        {
            id: 'cube',
            title: 'Desenhar Caixa Tridimensional',
            tool: 'cube'
        }
    ]
];

export default toolBarData;
