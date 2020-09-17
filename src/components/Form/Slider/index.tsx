import React, { useRef, useEffect, useState, MouseEvent } from 'react';
import { useTransition, animated } from 'react-spring';
import { useField } from '@unform/core';

import { Container, TextBlock } from './styles';

import { useTheme } from '../../../contexts/theme';

interface SliderProps {
    name: string;
    text: string;
    min: number;
    max: number;
    initialValue: number;
}

const Slider: React.FC<SliderProps> = ({
    name,
    text,
    min,
    max,
    initialValue
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const { fieldName, registerField } = useField(name);
    const [dragging, setDragging] = useState(false);
    const [value, setValue] = useState(initialValue);
    const transitions = useTransition(dragging, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });
    const theme = useTheme();

    useEffect(() => {
        registerField<number>({
            name: fieldName,
            ref: sliderRef.current,
            getValue: (ref: HTMLDivElement): number => {
                if (ref.dataset.value === undefined) {
                    return 0;
                }
                let num = parseFloat(ref.dataset.value);
                if (Number.isNaN(num)) {
                    num = initialValue;
                }
                return num;
            },
            setValue: (ref: HTMLDivElement, value: number) => {
                const newValue = Math.min(max, Math.max(min, value));
                setValue(newValue);
            }
        });
    }, [fieldName, registerField]);

    function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
        if (!sliderRef.current) {
            return;
        }
        const rc = sliderRef.current.getBoundingClientRect();
        const x = e.pageX - rc.left;
        const width = rc.width;
        let newValue = (x / width) * (max - min) + min;
        newValue = Math.min(max, Math.max(min, Math.round(newValue)));
        setValue(newValue);
        setDragging(true);
        const handleMouseMove = (evt: globalThis.MouseEvent) => {
            const x = evt.pageX - rc.left;
            newValue = (x / width) * (max - min) + min;
            newValue = Math.min(max, Math.max(min, Math.round(newValue)));
            setValue(newValue);
        };
        const handleMouseUp = (/* evt: globalThis.MouseEvent */) => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            setDragging(false);
            /*
            if (onDragStop) {
                const x = evt.pageX - rc.left;
                newValue = (x / width) * (max - min) + min;
                newValue = Math.min(max, Math.max(min, Math.round(newValue)));
                onDragStop(newValue);
            }
            */
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    return (
        <>
            <TextBlock>{text}</TextBlock>
            <Container
                ref={sliderRef}
                pos={((value - min) / (max - min)) * 100}
                isMax={value === max}
                data-value={value}
                onMouseDown={handleMouseDown}
                theme={theme}
            >
                <div className="bar">
                    <div className="bar-btn">
                        {transitions.map(
                            ({ item, key, props }) => item && (
                                <animated.div key={key} style={props} className="popup">
                                    {value}
                                </animated.div>
                            )
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Slider;
