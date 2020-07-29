import * as jPlot from 'jplot';
import { RawDraftContentState } from 'draft-js';

export interface ElementText {
    id: number | string;
    type: string;
    width: number;
    height: number;
    left: number;
    top: number;
    text: string;
    rawContent: RawDraftContentState;
}

export interface ElementPlot {
    id: number | string;
    type: string;
    width: number;
    height: number;
    left: number;
    top: number;
    items: jPlot.RenderItem[];
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
