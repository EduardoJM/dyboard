import React, { useState, SyntheticEvent, useEffect } from 'react';
import { ResizeCallbackData } from 'react-resizable';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';

import { Store } from '../../../redux/reducers/types';

import { ElementAll } from '../../../data/board';

import { useTheme } from '../../../contexts/theme';

import { ResizableContainer, DraggableContainer, StaticContainer } from '../commonStyles';

interface ElementContainerProps {
    data: ElementAll;
    disableResize?: boolean;
    staticSize?: [number, number];
}

const ElementContainer: React.FC<ElementContainerProps> = ({
    children,
    data,
    disableResize,
    staticSize
}) => {
    const [left, setLeft] = useState(data.left);
    const [top, setTop] = useState(data.top);
    const [width, setWidth] = useState(data.width);
    const [height, setHeight] = useState(data.height);
    const theme = useTheme();
    const dispatch = useDispatch();

    const tools = useSelector((state: Store) => state.tools);

    useEffect(() => {
        if (disableResize && staticSize !== undefined) {
            setWidth(staticSize[0]);
            setHeight(staticSize[1]);
        }
    }, [disableResize, staticSize]);

    function handleOnResize(event: SyntheticEvent, data: ResizeCallbackData) {
        setWidth(data.size.width);
        setHeight(data.size.height);
    };

    function handleOnDrag(event: DraggableEvent, eventData: DraggableData) {
        setLeft(eventData.x);
        setTop(eventData.y);
        const newItem = {
            ...data,
            left: eventData.x,
            top: eventData.y,
            width,
            height
        };
        dispatch({ type: 'UPDATE_BOARD_ITEM', boardItem: newItem, oldItem: data });
    }

    function handleResizeStop() {
        const newItem = {
            ...data,
            left,
            top,
            width,
            height
        };
        dispatch({ type: 'UPDATE_BOARD_ITEM', boardItem: newItem, oldItem: data });
    }

    function handleClick() {
        if (tools.tool === 'cursor') {
            dispatch({ type: 'SET_SELECTION', boardItem: data });
        }
    }

    if (tools.tool === 'resize') {
        if (disableResize) {
            return (
                <StaticContainer
                    width={width}
                    height={height}
                    left={left}
                    top={top}
                    onClick={handleClick}
                >
                    {children}
                </StaticContainer>
            );
        }
        return (
            <ResizableContainer
                width={width}
                height={height}
                onResize={handleOnResize}
                onResizeStop={handleResizeStop}
                minConstraints={[100, 100]}
                left={left}
                top={top}
                theme={theme}
            >
                {children}
            </ResizableContainer>
        );
    } else if (tools.tool === 'drag') {
        return (
            <Draggable
                position={{
                    x: left,
                    y: top
                }}
                onStop={handleOnDrag}
            >
                <DraggableContainer
                    width={width}
                    height={height}
                    theme={theme}
                >
                    {children}
                </DraggableContainer>
            </Draggable>
        );
    }
    return (
        <StaticContainer
            width={width}
            height={height}
            left={left}
            top={top}
            onClick={handleClick}
        >
            {children}
        </StaticContainer>
    );
};

export default ElementContainer;
