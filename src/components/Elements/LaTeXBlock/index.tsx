import React, { useState, useEffect } from 'react';
import Katex from 'katex';
import { ElementLaTeX } from '../../../data/board';
import ElementContainer from '../ElementContainer';

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
    const [mathText, setMathText] = useState('');

    useEffect(() => {
        const html = Katex.renderToString(data.text);
        const size = measureHtml(html);
        setWidth(size.width);
        setHeight(size.height);
        setMathText(html);
    }, [data.text]);

    return (
        <ElementContainer data={data} disableResize={true} staticSize={[width, height]}>
            <div dangerouslySetInnerHTML={{ __html: mathText }} />
        </ElementContainer>
    );
};

export default LaTeXBlock;
