export interface ElementText {
    id: number | string;
    type: string;
    width: number;
    height: number;
    left: number;
    top: number;
    text: string;
    supportLatex: boolean;
    markdown: boolean;
}

export type ElementAll = (ElementText);

export type ElementsCollection = ElementAll[];
