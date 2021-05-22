import * as yup from 'yup';

import { Element } from './types';
import { ElementSchema } from './schemas';

const boardData = {
    async parse(content: string) : Promise<Element[] | null> {
        const json = JSON.parse(content);
        const schema = yup.array(ElementSchema.required());
        try {
            const data = await schema.validate(json);
            if (!data) {
                return null;
            }
            return data as Element[];
        } catch (error) {
            return null;
        }
    },
    stringify(list: Element[]): string {
        return JSON.stringify(list);
    }
};

export * from './types';
export * from './schemas';
export default boardData;
