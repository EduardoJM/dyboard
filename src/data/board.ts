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

export type ElementAll = (ElementText | ElementPlot | ElementSpace3D | ElementImage);

export type ElementsCollection = ElementAll[];

export interface LoaderHelperRenderItem {
    type: string;

    xAxis?: boolean;
    xAxisWidth?: number;
    xAxisColor?: string;
    yAxis?: boolean;
    yAxisWidth?: number;
    yAxisColor?: string;
    arrows?: boolean;
    arrowSize?: number;
    xAxisThick?: boolean;
    xAxisThickSize?: number;
    xAxisThickWidth?: number;
    xAxisThickStyle?: 'upper' | 'lower' | 'middle';
    xAxisThickColor?: string;
    xAxisThickNumbers?: boolean;
    xAxisThickFont?: string;
    yAxisThick?: boolean;
    yAxisThickSize?: number;
    yAxisThickWidth?: number;
    yAxisThickStyle?: 'left' | 'right' | 'middle';
    yAxisThickColor?: string;
    yAxisThickNumbers?: boolean;
    yAxisThickFont?: string;

    resolution?: number;
    color?: string;
    lineWidth?: number;
    function?: string;
    breakDistance?: number;
}

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
    items?: LoaderHelperRenderItem[];
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
            const newItems = plt.items.map((item) => {
                if (item instanceof jPlot.default.Axis) {
                    return {
                        type: 'axis',
                        ...item
                    };
                } else if (item instanceof jPlot.default.Function) {
                    return {
                        type: 'function',
                        ...item
                    };
                }
                return null;
            });
            return {
                ...baseElement,
                items: newItems.filter((item) => item !== null)
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
            const newItems = item.items.map((renderItem) => {
                if (renderItem.type === 'axis') {
                    return new jPlot.default.Axis({
                        ...renderItem
                    });
                } else if (renderItem.type === 'function') {
                    return new jPlot.default.Function({
                        ...renderItem
                    });
                }
            });
            return {
                ...baseItem,
                items: newItems.filter((item) => item !== null)
            };
        }
        return null;
    });
    const filtered = result.filter((item) => item !== null);
    return filtered as ElementsCollection;
}
