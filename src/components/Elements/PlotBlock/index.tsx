import React, { useState, useEffect, createRef, SyntheticEvent } from 'react';
import jPlot from 'jplot';
import { ResizeCallbackData } from 'react-resizable';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

import Container from './styles';

import { ElementPlot } from '../../../data/board';

import { useTools } from '../../../contexts/tools';
import { useTheme } from '../../../contexts/theme';

import { ResizableContainer, DraggableContainer } from '../commonStyles';

interface PlotBlockProps {
    data: ElementPlot;
}

const PlotBlock: React.FC<PlotBlockProps> = ({ data }) => {
    const [left, setLeft] = useState(data.left);
    const [top, setTop] = useState(data.top);
    const [width, setWidth] = useState(data.width);
    const [height, setHeight] = useState(data.height);
    const canvasRef = createRef<HTMLCanvasElement>();
    const tools = useTools();
    const theme = useTheme();

    useEffect(() => {
        if (!canvasRef) {
            return;
        }
        if (!canvasRef.current) {
            return;
        }
        const view = new jPlot.View(canvasRef.current);
        data.items.forEach((item) => {
            view.items.push(item);
        });

        view.zoom = { x: 100, y: 100 };
        view.translation = { x: -1.5, y: -1.5 };

        view.render();
    }, [canvasRef]);

    function handleOnResize(event: SyntheticEvent, data: ResizeCallbackData) {
        setWidth(data.size.width);
        setHeight(data.size.height);
    };

    function handleOnDrag(event: DraggableEvent, data: DraggableData) {
        setLeft(data.x);
        setTop(data.y);
    }

    function handleClick() {
        if (tools.currentTool === 'cursor') {
            tools.setCurrentElement(data);
        }
    }

    const html = (
        <Container
            ref={canvasRef}
            absolute={tools.currentTool === 'cursor'}
            left={left}
            top={top}
            width={width}
            height={height}
            onClick={handleClick}
        />
    );

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
    }
    return html;
};

export default PlotBlock;
