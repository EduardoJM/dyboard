import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import ListItem from './styles';

import { useTheme } from '../../../contexts/theme';

interface ListBoxItemProps {
    selected: boolean;
    index: number;
    onClick?: () => void;
    dragType: string;
    dragMove: (fromIndex: number, toIndex: number) => void;
}

interface DragItem{
    type: string;
    index: number;
}

const ListBoxItem: React.FC<ListBoxItemProps> = ({
    children,
    selected,
    index,
    onClick,
    dragType,
    dragMove
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const theme = useTheme();

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: dragType, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, dropRef] = useDrop({
        accept: dragType,
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const draggedIndex = item.index;
            const targetIndex = index;
            if (draggedIndex === targetIndex) {
                return;
            }
            const targetSize = ref.current.getBoundingClientRect();
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;

            const draggedOffset = monitor.getClientOffset();
            if (!draggedOffset) {
                return;
            }
            const draggedTop = draggedOffset.y - targetSize.top;
            if (draggedIndex < targetIndex && draggedTop < targetCenter) {
                return;
            }
            if (draggedIndex > targetIndex && draggedTop > targetCenter) {
                return;
            }
            dragMove(draggedIndex, targetIndex);
            item.index = targetIndex;
        }
    });

    dragRef(dropRef(ref));

    return (
        <ListItem
            ref={ref}
            isDragging={isDragging}
            theme={theme}
            className={`list-item${selected ? ' active' : ''}`}
            onClick={onClick}
        >
            {children}
        </ListItem>
    );
};

export default ListBoxItem;
