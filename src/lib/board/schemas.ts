import * as yup from 'yup';

export const ElementDataTextSchema = yup.object().shape({
    text: yup.string().required(),
    rawContent: yup.object().required()
});

export const ElementDataLaTeXSchema = yup.object().shape({
    text: yup.string().required()
});

export const ElementDataImageSchema = yup.object().shape({
    imageContent: yup.string().required()
});

export const ElementDataHandWritePathSchema = yup.object().shape({
    id: yup.string().required(),
    color: yup.string().required(),
    width: yup.number().required().positive().notOneOf([0]),
    points: yup.array(yup.object().shape({
        x: yup.number().required(),
        y: yup.number().required()
    })).required()
});

export const ElementDataHandWriteSchema = yup.object().shape({
    paths: yup.array(ElementDataHandWritePathSchema).required()
});

export const ElementSchema = yup.object().shape({
    type: yup.string().required().oneOf(['text', 'latex', 'image', 'handwrite']),
    id: yup.string().required(),
    width: yup.number().required(),
    height: yup.number().required(),
    left: yup.number().required(),
    top: yup.number().required(),
    data: yup.object()
        .when('type', (type: string, schema: yup.ObjectSchema) => {
            if (type === 'text') {
                return ElementDataTextSchema;
            } else if (type === 'latex') {
                return ElementDataLaTeXSchema;
            } else if (type === 'image') {
                return ElementDataImageSchema;
            } else if (type === 'handwrite') {
                return ElementDataHandWriteSchema;
            }
            return schema;
        })
});
