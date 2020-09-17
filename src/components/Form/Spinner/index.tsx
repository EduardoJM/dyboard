import React, { useRef, useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useField } from '@unform/core';

import { Container, InputContainer } from './styles';

import { useTheme } from '../../../contexts/theme';

interface SpinnerProps {
    name: string;
    text: string;
    min: number;
    max: number;
    initialValue: number;
    transform?: number;
}

const Spinner: React.FC<SpinnerProps> = ({
    name,
    text,
    min,
    max,
    initialValue,
    transform
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, registerField } = useField(name);
    const [value, setValue] = useState(initialValue.toString());
    const theme = useTheme();

    useEffect(() => {
        registerField<number>({
            name: fieldName,
            ref: inputRef.current,
            getValue: (ref: HTMLInputElement): number => {
                let val = parseFloat(ref.value);
                if (Number.isNaN(val)) {
                    val = initialValue;
                }
                if (transform === undefined) {
                    return val;
                }
                const num = (val / transform);
                return num;
            },
            setValue: (ref: HTMLInputElement, value: number) => {
                let newValue = Math.min(max, Math.max(min, value));
                if (transform !== undefined) {
                    newValue *= transform;
                }
                setValue(newValue.toString());
            }
        });
    }, [fieldName, registerField]);

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const val = parseFloat(e.target.value);
        if (Number.isNaN(val)) {
            return;
        }
        const newValue = Math.min(max, Math.max(min, val));
        if (newValue !== val) {
            setValue(newValue.toString());
        } else {
            setValue(e.target.value);
        }
    }

    function handleDown(e: MouseEvent<HTMLDivElement>) {
        const startY = e.pageY;
        const mouseUp = () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };
        const mouseMove = (evt: globalThis.MouseEvent) => {
            let numberValue = parseFloat(value);
            if (Number.isNaN(numberValue)) {
                numberValue = initialValue;
            }
            const changedValue = numberValue - (evt.pageY - startY);
            const val = Math.max(min, Math.min(max, changedValue));
            setValue(val.toString());
        };
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    return (
        <InputContainer>
            <label>{text}</label>
            <Container className="spinner" theme={theme}>
                <input
                    type="text"
                    name={name}
                    ref={inputRef}
                    value={value}
                    onChange={handleInputChange}
                />
                <div className="buttons" onMouseDown={handleDown}>
                    <div className="up-button">
                        <MdKeyboardArrowUp size={16} />
                    </div>
                    <div className="down-button">
                        <MdKeyboardArrowDown size={16} />
                    </div>
                </div>
            </Container>
        </InputContainer>
    );
};

export default Spinner;
