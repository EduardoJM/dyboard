import React, { useState, useEffect } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import Katex from 'katex';

import { useTools } from '../../../contexts/tools';
import { useTheme } from '../../../contexts/theme';
import { useBoard } from '../../../contexts/board';

import { ElementLaTeX } from '../../../data/board';

import { StaticContainer, DraggableContainer } from '../commonStyles';

interface TextBlockProps {
    data: ElementLaTeX;
}

const measureHtml = (html: string): { width: number; height: number; } => {
    const div = document.createElement('div');
    const root = document.getElementById('root');
    if (!root) {
        return { width: 0, height: 0 };
    }
    div.style.display = 'inline';
    div.style.position = 'absolute';
    div.style.left = '-100000px';
    div.style.top = '-100000px';
    div.innerHTML = html;
    root.appendChild(div);
    const rc = div.getBoundingClientRect();
    root.removeChild(div);
    return {
        width: Math.ceil(rc.width) + 10,
        height: Math.ceil(rc.height) + 10
    };
};

const LaTeXBlock: React.FC<TextBlockProps> = ({ data }) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [left, setLeft] = useState(data.left);
    const [top, setTop] = useState(data.top);
    const [mathText, setMathText] = useState('');
    const tools = useTools();
    const board = useBoard();
    const theme = useTheme();

    useEffect(() => {
        const html = Katex.renderToString(data.text);
        const size = measureHtml(html);
        setWidth(size.width);
        setHeight(size.height);
        setMathText(html);
    }, [data.text]);

    function handleOnDrag(event: DraggableEvent, eventData: DraggableData) {
        setLeft(eventData.x);
        setTop(eventData.y);
        // update bounds
        board.updateElementBounds(data, eventData.x, eventData.y, 250, 250, tools);
    }

    function handleClick() {
        if (tools.currentTool === 'cursor') {
            tools.setCurrentElement(data);
        }
    }

    const html = <div dangerouslySetInnerHTML={{ __html: mathText }} />;

    if (tools.currentTool === 'drag') {
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
                left={left}
                top={top}
                width={width}
                height={height}
                onClick={handleClick}
            >
                { html }
            </StaticContainer>
        );
    }
};

export default LaTeXBlock;
