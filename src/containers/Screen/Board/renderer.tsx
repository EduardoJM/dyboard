import React from 'react';
import { Element } from '../../../lib/board';
import {
    TextBlock,
    LaTeXBlock,
    HandWritingBlock,
    ImageBlock
} from '../../../components/Elements';

export default function renderElement(el: Element): JSX.Element {
    if (el.type === 'text') {
        return <TextBlock key={el.id} data={el} />;
    } else if (el.type === 'latex') {
        return <LaTeXBlock key={el.id} data={el} />;
    } else if (el.type === 'image') {
        return <ImageBlock key={el.id} data={el} />;
    } else if (el.type === 'handwrite') {
        return <HandWritingBlock key={el.id} data={el} />;
    }
    throw new Error('unsupported type here.');
}
