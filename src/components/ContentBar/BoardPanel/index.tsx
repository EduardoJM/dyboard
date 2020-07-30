import React from 'react';

import { ListBox, ListBoxItem } from '../../Form/DraggableListBox';

import { useBoard } from '../../../contexts/board';
import { useTools } from '../../../contexts/tools';

import { ElementAll } from '../../../data/board';

const BoardPanel: React.FC = () => {
    const board = useBoard();
    const tools = useTools();

    function getDisplayText(name: string) {
        if (name === 'image') {
            return 'Imagem';
        } else if (name === 'text') {
            return 'Texto';
        } else if (name === 'plot') {
            return 'Gráfico 2D';
        }
        return 'Não suportado';
    }

    function handleListItemClick(item: ElementAll) {
        tools.setCurrentElement(item);
    }

    function handleListItemDrag(fromIndex: number, toIndex: number) {
        const dragged = board.elements[fromIndex];
        const newElements = [...board.elements];
        newElements.splice(fromIndex, 1);
        newElements.splice(toIndex, 0, dragged);
        board.changeElements(newElements);
    }

    return (
        <ListBox>
            {board.elements.map((item, index) => (
                <ListBoxItem
                    key={item.id}
                    dragType="BOARD_ITEM"
                    dragMove={handleListItemDrag}
                    index={index}
                    selected={tools.currentElement === item}
                    onClick={() => handleListItemClick(item)}
                >
                    {getDisplayText(item.type)}
                </ListBoxItem>
            ))}
        </ListBox>
    );
};

export default BoardPanel;
