export interface ElementText {
    id: number | string;
    type: string;
    width: number;
    height: number;
    left: number;
    top: number;
    text: string;
}

export interface ElementPlot {
    id: number | string;
    type: string;
    width: number;
    height: number;
    left: number;
    top: number;
}

export type ElementAll = (ElementText | ElementPlot);

export type ElementsCollection = ElementAll[];
