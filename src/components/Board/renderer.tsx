import React from 'react';
import { ElementAll, ElementText, ElementPlot, ElementSpace3D, ElementImage } from '../../data/board';

import TextBlock from '../Elements/TextBlock';
import PlotBlock from '../Elements/PlotBlock';
import Space3DBlock from '../Elements/Space3DBlock';
import ImageBlock from '../Elements/ImageBlock';

function renderTextBlock(data: ElementText): JSX.Element {
    return <TextBlock data={data} key={data.id} />;
}

function renderPlotBlock(data: ElementPlot): JSX.Element {
    return <PlotBlock data={data} key={data.id} />;
}

function renderSpace3DBlock(data: ElementSpace3D): JSX.Element {
    return <Space3DBlock data={data} key={data.id} />;
}

function renderImageBlock(data: ElementImage): JSX.Element {
    return <ImageBlock data={data} key={data.id} />;
}

export default function renderElement(el: ElementAll): JSX.Element {
    if (el.type === 'text') {
        return renderTextBlock(el as ElementText);
    } else if (el.type === 'plot') {
        return renderPlotBlock(el as ElementPlot);
    } else if (el.type === '3d-space') {
        return renderSpace3DBlock(el as ElementSpace3D);
    } else if (el.type === 'image') {
        return renderImageBlock(el as ElementImage);
    }
    return <span key={el.id}></span>;
}
