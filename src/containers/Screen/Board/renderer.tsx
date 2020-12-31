import React from 'react';
import {
    ElementAll,
    ElementText,
    ElementPlot,
    ElementImage,
    ElementLaTeX,
    ElementHandWrite
} from '../../../data/board';
import {
    TextBlock,
    LaTeXBlock,
    PlotBlock,
    HandWritingBlock,
    ImageBlock
} from '../../../components/Elements';

function renderTextBlock(data: ElementText): JSX.Element {
    return <TextBlock data={data} key={data.id} />;
}

function renderLaTeXBlock(data: ElementLaTeX): JSX.Element {
    return <LaTeXBlock data={data} key={data.id} />;
}

function renderPlotBlock(data: ElementPlot): JSX.Element {
    return <PlotBlock data={data} key={data.id} />;
}

function renderImageBlock(data: ElementImage): JSX.Element {
    return <ImageBlock data={data} key={data.id} />;
}

function renderHandWritingBlock(data: ElementHandWrite) {
    return <HandWritingBlock data={data} key={data.id} />;
}

export default function renderElement(el: ElementAll): JSX.Element {
    if (el.type === 'text') {
        return renderTextBlock(el as ElementText);
    } else if (el.type === 'latex') {
        return renderLaTeXBlock(el as ElementLaTeX);
    } else if (el.type === 'plot') {
        return renderPlotBlock(el as ElementPlot);
    } else if (el.type === 'image') {
        return renderImageBlock(el as ElementImage);
    } else if (el.type === 'hand-writing') {
        return renderHandWritingBlock(el as ElementHandWrite);
    }
    return <span key={el.id}></span>;
}
