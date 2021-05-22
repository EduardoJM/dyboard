import { Element } from './types';
import * as schemas from './schemas';

describe('Board Schemas', () => {
    test('ElementSchema must be parse object with type text data as text data', async() => {
        const obj = {
            id: 'my-id',
            width: 400,
            height: 600,
            left: 0,
            top: 0,
            data: {
                text: 'hi!',
                rawContent: {
                    blocks: [],
                    entityMap: {}
                }
            }
        };
        const el: Element = {
            type: 'text',
            ...obj
        };
        expect(async() => {
            const result = await schemas.ElementSchema.validate(el);
            expect(result).toMatchObject({
                type: 'text',
                ...obj
            });
        }).not.toThrow(Error);
    });

    test('ElementSchema must be parse object with type latex data as latex data', async() => {
        const obj = {
            id: 'my-id',
            width: 400,
            height: 600,
            left: 0,
            top: 0,
            data: {
                text: 'latex!'
            }
        };
        const el: Element = {
            type: 'latex',
            ...obj
        };
        expect(async() => {
            const result = await schemas.ElementSchema.validate(el);
            expect(result).toMatchObject({
                type: 'latex',
                ...obj
            });
        }).not.toThrow(Error);
    });

    test('ElementSchema must be parse object with type image data as image data', async() => {
        const obj = {
            id: 'my-id',
            width: 400,
            height: 600,
            left: 0,
            top: 0,
            data: {
                imageContent: 'imageeeee'
            }
        };
        const el: Element = {
            type: 'image',
            ...obj
        };
        expect(async() => {
            const result = await schemas.ElementSchema.validate(el);
            expect(result).toMatchObject({
                type: 'image',
                ...obj
            });
        }).not.toThrow(Error);
    });

    test('ElementSchema must be parse object with type handwrite data as handwrite data', async() => {
        const obj = {
            id: 'my-id',
            width: 400,
            height: 600,
            left: 0,
            top: 0,
            data: {
                paths: [
                    {
                        id: 'aaa',
                        color: 'red',
                        width: 1,
                        points: [{ x: 1, y: 1 }]
                    }
                ]
            }
        };
        const el: Element = {
            type: 'handwrite',
            ...obj
        };
        expect(async() => {
            const result = await schemas.ElementSchema.validate(el);
            expect(result).toMatchObject({
                type: 'handwrite',
                ...obj
            });
        }).not.toThrow(Error);
    });
});
