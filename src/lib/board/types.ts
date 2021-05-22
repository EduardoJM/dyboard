import { RawDraftContentState } from 'draft-js';

export interface ElementDataText {
    text: string;
    rawContent: RawDraftContentState;
}

export interface ElementDataLaTeX {
    text: string;
}

export interface ElementDataImage {
    imageContent: string;
}

export interface ElementDataHandWritePath {
    id: string;
    color: string;
    width: number;
    points: { x: number; y: number; }[];
}

export interface ElementDataHandWrite {
    paths: ElementDataHandWritePath[];
}

export interface ElementTypeDataMap {
    text: ElementDataText;
    latex: ElementDataLaTeX;
    image: ElementDataImage;
    handwrite: ElementDataHandWrite;
}

export interface TypedElement<K extends keyof ElementTypeDataMap> {
    type: K;
    id: string;
    width: number;
    height: number;
    left: number;
    top: number;
    data: ElementTypeDataMap[K];
}

export type Element = TypedElement<'text'> |
    TypedElement<'latex'> |
    TypedElement<'image'> |
    TypedElement<'handwrite'>;
