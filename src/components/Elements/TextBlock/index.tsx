import React, { useState, SyntheticEvent } from 'react';
import { ResizeCallbackData } from 'react-resizable';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

import { useTools } from '../../../contexts/tools';
import { useTheme } from '../../../contexts/theme';

import {
    ResizableContainer,
    DraggableContainer,
    StaticContainer
} from './styles';

interface TextBlockProps {
    children: string;
    initialWidth: number;
    initialHeight: number;
    initialLeft: number;
    initialTop: number;
}

const TextBlock: React.FC<TextBlockProps> = ({
    children,
    initialWidth,
    initialHeight,
    initialLeft,
    initialTop
}) => {
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [left, setLeft] = useState(initialLeft);
    const [top, setTop] = useState(initialTop);
    const tools = useTools();
    const theme = useTheme();

    function handleOnResize(event: SyntheticEvent, data: ResizeCallbackData) {
        setWidth(data.size.width);
        setHeight(data.size.height);
    };

    function handleOnDrag(event: DraggableEvent, data: DraggableData) {
        setLeft(data.x);
        setTop(data.y);
    }

    const html = <div dangerouslySetInnerHTML={{ __html: children }} />;

    if (tools.currentTool === 'resize') {
        return (
            <ResizableContainer
                width={width}
                height={height}
                onResize={handleOnResize}
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
            >
                { html }
            </StaticContainer>
        );
    }
};

export default TextBlock;
