import React from 'react';
import {
    ElementAll,
    ElementText,
    ElementPlot,
    ElementImage,
    ElementLaTeX
} from '../../../data/board';
import {
    TextBlock,
    LaTeXBlock,
    PlotBlock,
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

export default function renderElement(el: ElementAll): JSX.Element {
    if (el.type === 'text') {
        return renderTextBlock(el as ElementText);
    } else if (el.type === 'latex') {
        return renderLaTeXBlock(el as ElementLaTeX);
    } else if (el.type === 'plot') {
        return renderPlotBlock(el as ElementPlot);
    } else if (el.type === 'image') {
        return renderImageBlock(el as ElementImage);
    }
    return <span key={el.id}></span>;
}
