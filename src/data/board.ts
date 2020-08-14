import { RenderItem, SerializationUtils } from 'jplot';
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

export interface ElementImage {
    id: number | string;
    type: string;
    width: number;
    height: number;
    left: number;
    top: number;
    imageContent: string;
}

export interface ElementPlot {
    id: number | string;
    type: string;
    width: number;
    height: number;
    left: number;
    top: number;
    items: RenderItem[];
    translation: {
        x: number;
        y: number;
    };
    zoom: {
        x: number;
        y: number;
    };
}

export interface ElementSpace3D {
    id: number | string;
    type: string;
    width: number;
    height: number;
    left: number;
    top: number;
}

export type ElementAll = (ElementText | ElementPlot | ElementSpace3D | ElementImage);

export type ElementsCollection = ElementAll[];

export interface LoaderHelperElement {
    id: number | string;
    type: string;
    width: number;
    height: number;
    left: number;
    top: number;
    text?: string;
    rawContent?: string;
    imageContent?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items?: any;
    translation?: {
        x: number;
        y: number;
    };
    zoom?: {
        x: number;
        y: number;
    };
}

export function elementsToString(data: ElementsCollection): string {
    const result = data.map((element) => {
        const { id, type, width, height, left, top } = element;
        const baseElement = {
            id,
            type,
            width,
            height,
            left,
            top
        };
        if (element.type === 'text') {
            const text = element as ElementText;
            return {
                ...baseElement,
                text: text.text,
                rawContent: JSON.stringify(text.rawContent)
            };
        } else if (element.type === 'image') {
            const img = element as ElementImage;
            return {
                ...baseElement,
                imageContent: img.imageContent
            };
        } else if (element.type === 'plot') {
            const plt = element as ElementPlot;
            return {
                ...baseElement,
                translation: plt.translation,
                zoom: plt.zoom,
                items: JSON.parse(SerializationUtils.serializeItemsCollection(plt.items))
            };
        }
        return null;
    });
    const filtered = result.filter((item) => item !== null);
    return JSON.stringify(filtered);
}

export function parseToElements(data: LoaderHelperElement[]): ElementsCollection {
    const result: (ElementAll | null)[] = data.map((item) => {
        const { id, type, width, height, left, top } = item;
        const baseItem = {
            id,
            type,
            width,
            height,
            left,
            top
        };
        if (item.type === 'text') {
            if (item.rawContent === undefined) {
                return null;
            }
            return {
                ...baseItem,
                text: item.text,
                rawContent: JSON.parse(item.rawContent) as RawDraftContentState
            };
        } else if (item.type === 'image') {
            return {
                ...baseItem,
                imageContent: item.imageContent
            };
        } else if (item.type === 'plot') {
            if (!item.items) {
                return null;
            }
            return {
                ...baseItem,
                translation: item.translation
                    ? item.translation
                    : {
                        x: 0,
                        y: 0
                    },
                zoom: item.zoom
                    ? item.zoom
                    : {
                        x: 100,
                        y: 100
                    },
                items: SerializationUtils.deserializeItemsCollection(JSON.stringify(item.items))
            };
        }
        return null;
    });
    const filtered = result.filter((item) => item !== null);
    return filtered as ElementsCollection;
}
