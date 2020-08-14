import React from 'react';
import { FunctionItem } from 'jplot';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import Spinner from '../../../Form/Spinner';
import Input from '../../../Form/Input';
import { LineStyleWidget, LineStyleSchema } from '../Widgets';

export const validationSchema = Yup.object().shape({
    name: Yup.string(),
    function: Yup.string(),
    lineStyle: LineStyleSchema,
    resolution: Yup.number()
});

interface FunctionPanelProps {
    item: FunctionItem;
}

const FunctionPanel: React.FC<FunctionPanelProps> = ({
    item
}) => {
    const { t } = useTranslation('jplot');

    return (
        <>
            <Input
                name="name"
                text={t('panels.function.name')}
                type="text"
                defaultValue={item.name}
            />
            <Input
                name="function"
                text={t('panels.function.expression')}
                type="text"
                defaultValue={item.function}
            />
            <LineStyleWidget
                name="lineStyle"
                text={t('panels.function.style')}
                style={item.lineStyle}
            />
            <Spinner
                name="resolution"
                text={t('panels.function.resolution')}
                min={10}
                max={1000}
                initialValue={item.resolution}
            />
        </>
    );
};

export default FunctionPanel;
