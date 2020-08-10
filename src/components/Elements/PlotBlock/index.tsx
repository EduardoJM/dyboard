import React, { useState, useEffect, MouseEvent, WheelEvent, createRef, SyntheticEvent } from 'react';
import { View } from 'jplot';
import { evaluate } from 'mathjs';
import { ResizeCallbackData } from 'react-resizable';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

import Container from './styles';

import { ElementPlot } from '../../../data/board';

import { useTools } from '../../../contexts/tools';
import { useTheme } from '../../../contexts/theme';
import { useBoard } from '../../../contexts/board';

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
    const board = useBoard();
    const theme = useTheme();

    let view: View | null = null;

    useEffect(() => {
        if (!canvasRef) {
            return;
        }
        if (!canvasRef.current) {
            return;
        }
        view = new View(canvasRef.current);
        view.evaluate = (expr, x) => evaluate(expr, { x });
        data.items.forEach((item) => {
            if (!view) {
                return;
            }
            view.items.push(item);
        });

        view.zoom = data.zoom;
        view.translation = data.translation;

        view.render();
    }, [canvasRef]);

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

    function handleMouseDown(e: MouseEvent) {
        if (!canvasRef.current || tools.currentTool !== 'cursor') {
            return;
        }
        const rc = canvasRef.current.getBoundingClientRect();
        let startX = e.pageX - rc.left;
        let startY = e.pageY - rc.top;
        const mouseMove = (evt: globalThis.MouseEvent) => {
            if (!view) {
                return;
            }
            const px = evt.pageX - rc.left;
            const py = evt.pageY - rc.top;
            const dx = px - startX;
            const dy = py - startY;
            startX = px;
            startY = py;
            view.translation = {
                x: view.translation.x - dx / view.zoom.x,
                y: view.translation.y - dy / view.zoom.y
            };
            view.render();
        };
        const mouseUp = () => {
            if (!view) {
                return;
            }
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            const idx = board.elements.indexOf(data);
            const isSelected = tools.currentElement === data;
            data.translation = view.translation;
            board.updateElement(idx, data);
            if (isSelected) {
                tools.setCurrentElement(data);
            }
        };
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    let scrollTimeout: number | undefined;

    function handleWheel(e: WheelEvent) {
        if (!canvasRef.current || !view) {
            return;
        }
        const delta = (e.deltaY / Math.abs(e.deltaY)) * 5;
        const zoomX = Math.max(1, Math.min(1000, view.zoom.x - delta));
        const zoomY = Math.max(1, Math.min(1000, view.zoom.y - delta));
        if (zoomX === view.zoom.x && zoomY === view.zoom.y) {
            return;
        }
        // this translation is to zoom with the center in focus
        const w = view.canvas.width / view.zoom.x;
        const h = view.canvas.height / view.zoom.y;
        const nw = view.canvas.width / zoomX;
        const nh = view.canvas.height / zoomY;
        view.translation = {
            x: view.translation.x - ((nw - w) / 2),
            y: view.translation.y - ((nh - h) / 2)
        };
        view.zoom = {
            x: zoomX,
            y: zoomY
        };
        view.render();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!view) {
                return;
            }
            const idx = board.elements.indexOf(data);
            const isSelected = tools.currentElement === data;
            data.translation = view.translation;
            data.zoom = view.zoom;
            board.updateElement(idx, data);
            if (isSelected) {
                tools.setCurrentElement(data);
            }
        }, 400);
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
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
        />
    );

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
    }
    return html;
};

export default PlotBlock;
