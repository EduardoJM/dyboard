import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { Store } from '../../../redux/reducers/types';

import { ListBox, ListBoxItem } from '../../Form/DraggableListBox';

import { ElementAll } from '../../../data/board';

const BoardPanel: React.FC = () => {
    const { t } = useTranslation('boardPanel');
    const dispatch = useDispatch();

    const currentItem = useSelector((state: Store) => state.board.currentElement);
    const boardItems = useSelector((state: Store) => state.board.elements);

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
        dispatch({ type: 'SET_SELECTION', boardItem: item });
    }

    function handleListItemDrag(fromIndex: number, toIndex: number) {
        const dragged = boardItems[fromIndex];
        const newElements = [...boardItems];
        newElements.splice(fromIndex, 1);
        newElements.splice(toIndex, 0, dragged);
        dispatch({ type: 'SET_BOARD_ITEMS', boardItemsCollection: newElements });
    }

    return (
        <ListBox>
            {boardItems.map((item, index) => (
                <ListBoxItem
                    key={item.id}
                    dragType="BOARD_ITEM"
                    dragMove={handleListItemDrag}
                    index={index}
                    selected={currentItem === item}
                    onClick={() => handleListItemClick(item)}
                >
                    {getDisplayText(item.type)}
                </ListBoxItem>
            ))}
        </ListBox>
    );
};

export default BoardPanel;
