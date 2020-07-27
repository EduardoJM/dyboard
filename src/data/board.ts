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

export interface ElementSpace3D {
    id: number | string;
    type: string;
    width: number;
    height: number;
    left: number;
    top: number;
}

export type ElementAll = (ElementText | ElementPlot | ElementSpace3D);

export type ElementsCollection = ElementAll[];
