import React from 'react';
import { ElementAll, ElementText } from '../../data/board';

import TextBlock from '../Elements/TextBlock';

function renderTextBlock(data: ElementText): JSX.Element {
    return (
        <TextBlock
            initialWidth={data.width}
            initialHeight={data.height}
            initialLeft={data.left}
            initialTop={data.top}
            key={data.id}
        >
            {data.text}
        </TextBlock>
    );
}

export default function renderElement(el: ElementAll): JSX.Element {
    if (el.type === 'text') {
        return renderTextBlock(el as ElementText);
    }
    return <span key={el.id}></span>;
}
