import React, { useState, SyntheticEvent } from 'react';
import { ResizeCallbackData } from 'react-resizable';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

import { useTools } from '../../../contexts/tools';

import Latex from '../../Latex';

import {
    ResizableContainer,
    DraggableContainer,
    StaticContainer
} from './styles';

interface TextBlockProps {
    children: string;
    supportLatex?: boolean;
}

const TextBlock: React.FC<TextBlockProps> = ({ children, supportLatex }) => {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const tools = useTools();

    function handleOnResize(event: SyntheticEvent, data: ResizeCallbackData) {
        setWidth(data.size.width);
        setHeight(data.size.height);
    };

    function handleOnDrag(event: DraggableEvent, data: DraggableData) {
        setLeft(data.x);
        setTop(data.y);
    }

    const RenderedChild = () => supportLatex ? (
        <Latex
            throwOnError={false}
        >
            { children as string }
        </Latex>
    ) : <>{ children }</>;

    if (tools.currentTool === 'resize') {
        return (
            <ResizableContainer
                width={width}
                height={height}
                onResize={handleOnResize}
                minConstraints={[100, 100]}
                left={left}
                top={top}
            >
                <RenderedChild />
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
                >
                    <RenderedChild />
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
                <RenderedChild />
            </StaticContainer>
        );
    }
};

export default TextBlock;
