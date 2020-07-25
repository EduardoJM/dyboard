import React, { useState, useEffect, createRef, SyntheticEvent } from 'react';
import jPlot from 'jplot';
import { ResizeCallbackData } from 'react-resizable';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

import Container from './styles';

import { useTools } from '../../../contexts/tools';
import { useTheme } from '../../../contexts/theme';

import { ResizableContainer, DraggableContainer } from '../commonStyles';

interface PlotProps {
    initialLeft: number;
    initialTop: number;
    initialWidth: number;
    initialHeight: number;
}

const PlotBlock: React.FC<PlotProps> = ({
    initialLeft,
    initialTop,
    initialWidth,
    initialHeight
}) => {
    const [left, setLeft] = useState(initialLeft);
    const [top, setTop] = useState(initialTop);
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
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
        view.items.push(new jPlot.Function({
            function: 'x^3',
            color: 'red'
        }));

        view.zoom = { x: 100, y: 100 };
        view.translation = { x: -2.5, y: -2.5 };

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

    const html = (
        <Container
            ref={canvasRef}
            absolute={tools.currentTool === 'cursor'}
            left={left}
            top={top}
            width={width}
            height={height}
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
