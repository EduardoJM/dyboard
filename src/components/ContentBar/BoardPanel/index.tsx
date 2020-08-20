import React from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox, ListBoxItem } from '../../Form/DraggableListBox';

import { useBoard } from '../../../contexts/board';
import { useTools } from '../../../contexts/tools';

import { ElementAll } from '../../../data/board';

const BoardPanel: React.FC = () => {
    const { t } = useTranslation('boardPanel');
    const board = useBoard();
    const tools = useTools();

    function getDisplayText(name: string) {
        if (name === 'image') {
            return t('items.image');
        } else if (name === 'text') {
            return t('items.text');
        } else if (name === 'latex') {
            return t('items.latex');
        } else if (name === 'plot') {
            return t('items.plot');
        }
        return t('items.unsupported');
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
