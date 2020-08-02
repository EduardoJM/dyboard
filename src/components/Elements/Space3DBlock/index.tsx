import React, { useState, useEffect, createRef, SyntheticEvent } from 'react';
import { ResizeCallbackData } from 'react-resizable';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

import { ElementSpace3D } from '../../../data/board';

import { useTools } from '../../../contexts/tools';
import { useBoard } from '../../../contexts/board';
import { useTheme } from '../../../contexts/theme';

import { ResizableContainer, DraggableContainer } from '../commonStyles';

import Container from './styles';

import { SpaceDrawner } from './drawner';
import DrawnerBase from './drawner/Base';
import CubeDrawner from './drawner/Cube';

interface Space3DBlockProps {
    data: ElementSpace3D;
}

const Space3DBlock: React.FC<Space3DBlockProps> = ({ data }) => {
    const [left, setLeft] = useState(data.left);
    const [top, setTop] = useState(data.top);
    const [width, setWidth] = useState(data.width);
    const [height, setHeight] = useState(data.height);
    const canvasRef = createRef<HTMLCanvasElement>();
    const tools = useTools();
    const board = useBoard();
    const theme = useTheme();

    const [drawnerTool, setDrawnerTool] = useState<DrawnerBase | null>(new CubeDrawner());
    const [drawner, setDrawner] = useState<SpaceDrawner>(new SpaceDrawner());

    useEffect(() => {
        if (!canvasRef) {
            return;
        }
        if (!canvasRef.current) {
            return;
        }
        drawner.setCanvas(canvasRef.current);
    }, [canvasRef]);

    useEffect(() => {
        drawner.setCurrent(drawnerTool);
    }, [drawnerTool]);

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

    useEffect(() => {
        if (!drawner) {
            return;
        }
        if (tools.currentTool === 'cursor') {
            if (tools.currentElement === data) {
                drawner.enableClicks();
            } else {
                drawner.disableClicks();
            }
        } else {
            drawner.disableClicks();
        }
    }, [tools.currentElement, tools.currentTool]);

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

export default Space3DBlock;
