import React from 'react';
import { ElementAll, ElementText, ElementPlot } from '../../data/board';

import TextBlock from '../Elements/TextBlock';
import PlotBlock from '../Elements/PlotBlock';

function renderTextBlock(data: ElementText): JSX.Element {
    return <TextBlock data={data} key={data.id} />;
}

function renderPlotBlock(data: ElementPlot): JSX.Element {
    return <PlotBlock data={data} key={data.id} />;
}

export default function renderElement(el: ElementAll): JSX.Element {
    if (el.type === 'text') {
        return renderTextBlock(el as ElementText);
    } else if (el.type === 'plot') {
        return renderPlotBlock(el as ElementPlot);
    }
    return <span key={el.id}></span>;
}
