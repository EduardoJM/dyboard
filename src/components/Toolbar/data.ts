export interface ToolBarObjectItem {
    id: string;
    title: string;
    tool: string;
    childs?: ToolBarObjectItem[];
}

const toolBarData = [
    {
        id: 'cursor',
        title: 'Cursor',
        tool: 'none'
    },
    {
        id: 'add',
        title: 'Adicionar Elementos',
        tool: 'child',
        childs: [
            {
                id: 'parent',
                title: 'Ferramentas',
                tool: 'parent'
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
                tool: 'child',
                childs: [
                    {
                        id: 'parent',
                        title: 'Adicionar Elementos',
                        tool: 'parent'
                    },
                    {
                        id: 'cube',
                        title: 'Desenhar Caixa Tridimensional',
                        tool: 'cube'
                    }
                ]
            }
        ]
    }
];

export default toolBarData;
