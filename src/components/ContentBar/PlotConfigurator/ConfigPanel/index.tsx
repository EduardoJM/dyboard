import React, { useRef } from 'react';
import {
    RenderItem,
    AreaUnderCurve,
    AreaUnderCurveCreateOptions,
    Point,
    PointCreateOptions,
    Axis,
    AxisCreateOptions,
    FunctionItem,
    FunctionItemCreateOptions
} from 'jplot';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Scrollbars from '../../../Scrollbars';

import { ElementPlot } from '../../../../data/board';

import AxisPanel, { validationSchema as AxisSchema } from './Axis';
import FunctionPanel, { validationSchema as FunctionSchema } from './Function';
import AreaUnderCurvePanel, { validationSchema as AreaUnderCurveSchema } from './AreaUnderCurve';
import PointPanel, { validationSchema as PointSchema } from './Point';

interface ConfigPanelProps {
    data: ElementPlot;
    currentItem: RenderItem | null;
    setCurrentItem: (newItem: RenderItem | null) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
    data,
    currentItem,
    setCurrentItem
}) => {
    const formRef = useRef<FormHandles>(null);
    const dispatch = useDispatch();
    const { t } = useTranslation('jplot');

    function updateCurrentItem(item: RenderItem) {
        if (!currentItem) {
            return;
        }
        const idx = data.items.indexOf(currentItem);
        if (idx < 0) {
            return;
        }
        const newItem = {
            ...data,
            items: [
                ...data.items.slice(0, idx),
                item,
                ...data.items.slice(idx + 1)
            ]
        };
        setCurrentItem(item);
        dispatch({ type: 'UPDATE_BOARD_ITEM', boardItem: newItem, oldItem: data });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleSubmit(data: any) {
        try {
            if (currentItem instanceof Axis) {
                AxisSchema.validate(data).then((validatedData) => {
                    updateCurrentItem(new Axis(validatedData as AxisCreateOptions));
                });
            } else if (currentItem instanceof FunctionItem) {
                FunctionSchema.validate(data).then((validatedData) => {
                    updateCurrentItem(new FunctionItem(validatedData as FunctionItemCreateOptions));
                });
            } else if (currentItem instanceof AreaUnderCurve) {
                AreaUnderCurveSchema.validate(data).then((validatedData) => {
                    updateCurrentItem(new AreaUnderCurve(validatedData as AreaUnderCurveCreateOptions));
                });
            } else if (currentItem instanceof Point) {
                PointSchema.validate(data).then((validatedData) => {
                    updateCurrentItem(new Point(validatedData as PointCreateOptions));
                });
            }
        } catch (err) {
        }
    }

    function handleApplyClick() {
        if (!formRef.current) {
            return;
        }
        formRef.current.submitForm();
    }

    if (!currentItem || !data.items.includes(currentItem)) {
        return (
            <div className="fit-center-text">
                {t('noSelection')}
            </div>
        );
    }

    return (
        <>
            <div className="heading">{t('configHeader')}</div>
            <div className="editor">
                <Scrollbars>
                    <div className="content">
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            {currentItem instanceof Axis && (
                                <AxisPanel item={currentItem} />
                            )}
                            {currentItem instanceof FunctionItem && (
                                <FunctionPanel item={currentItem} />
                            )}
                            {currentItem instanceof AreaUnderCurve && (
                                <AreaUnderCurvePanel item={currentItem} />
                            )}
                            {currentItem instanceof Point && (
                                <PointPanel item={currentItem} />
                            )}
                        </Form>
                    </div>
                </Scrollbars>
            </div>
            <div className="footer">
                <button onClick={handleApplyClick} type="button">{t('applyButton')}</button>
            </div>
        </>
    );
};

export default ConfigPanel;
