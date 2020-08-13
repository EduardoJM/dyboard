import React from 'react';
import { AreaUnderCurve } from 'jplot';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import Input from '../../../Form/Input';
import Spinner from '../../../Form/Spinner';
import Switch from '../../../Form/Switch';
import { FillStyleWidget, LineStyleWidget, FillStyleSchema, LineStyleSchema } from '../Widgets';

export const validationSchema = Yup.object().shape({
    curveName: Yup.string(),
    left: Yup.number(),
    right: Yup.number(),
    fill: Yup.boolean(),
    fillStyle: FillStyleSchema,
    stroke: Yup.boolean(),
    strokeStyle: LineStyleSchema
});

export interface AreaUnderCurvePanelProps {
    item: AreaUnderCurve;
}

const AreaUnderCurvePanel: React.FC<AreaUnderCurvePanelProps> = ({
    item
}) => {
    const { t } = useTranslation('jplot');

    return (
        <>
            <Input
                name="curveName"
                text={t('panels.areaUnderCurve.curveName')}
                type="text"
                defaultValue={item.curveName}
            />
            <Spinner
                name="left"
                text={t('panels.areaUnderCurve.left')}
                min={-100}
                max={100}
                initialValue={item.left}
            />
            <Spinner
                name="right"
                text={t('panels.areaUnderCurve.right')}
                min={-100}
                max={100}
                initialValue={item.right}
            />
            <Switch
                name="fill"
                text={t('panels.areaUnderCurve.fill')}
                initialCheck={item.fill}
            />
            <FillStyleWidget
                name="fillStyle"
                text={t('panels.areaUnderCurve.fillStyle')}
                initialStyle={item.fillStyle}
            />
            <Switch
                name="stroke"
                text={t('panels.areaUnderCurve.stroke')}
                initialCheck={item.stroke}
            />
            <LineStyleWidget
                name="strokeStyle"
                text={t('panels.areaUnderCurve.strokeStyle')}
                style={item.strokeStyle}
            />
        </>
    );
};

export default AreaUnderCurvePanel;
