import React, { useState, SyntheticEvent } from 'react';
import { ResizeCallbackData } from 'react-resizable';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

import { useTools } from '../../../contexts/tools';
import { useTheme } from '../../../contexts/theme';
import { useBoard } from '../../../contexts/board';

import { ElementText } from '../../../data/board';

import StaticContainer from './styles';
import { ResizableContainer, DraggableContainer } from '../commonStyles';

interface TextBlockProps {
    data: ElementText;
}

const TextBlock: React.FC<TextBlockProps> = ({ data }) => {
    const [width, setWidth] = useState(data.width);
    const [height, setHeight] = useState(data.height);
    const [left, setLeft] = useState(data.left);
    const [top, setTop] = useState(data.top);
    const tools = useTools();
    const board = useBoard();
    const theme = useTheme();

    function handleOnResize(event: SyntheticEvent, data: ResizeCallbackData) {
        setWidth(data.size.width);
        setHeight(data.size.height);
    };

    function handleOnDrag(event: DraggableEvent, eventData: DraggableData) {
        setLeft(eventData.x);
        setTop(eventData.y);
        // update bounds
        board.updateElementBounds(data, eventData.x, eventData.y, width, height, tools);
    }

    function handleResizeStop() {
        // update bounds
        board.updateElementBounds(data, left, top, width, height, tools);
    }

    function handleClick() {
        if (tools.currentTool === 'cursor') {
            tools.setCurrentElement(data);
        }
    }

    const html = <div dangerouslySetInnerHTML={{ __html: data.text }} />;

    if (tools.currentTool === 'resize') {
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
                { html }
            </ResizableContainer>
        );
    } else if (tools.currentTool === 'drag') {
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
                    { html }
                </DraggableContainer>
            </Draggable>
        );
    } else {
        return (
            <StaticContainer
                width={width}
                height={height}
                left={left}
                top={top}
                onClick={handleClick}
            >
                { html }
            </StaticContainer>
        );
    }
};

export default TextBlock;
