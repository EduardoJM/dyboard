import React, { ChangeEvent, MouseEvent } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import { SpinnerContainer } from './styles';

import { useTheme } from '../../../../contexts/theme';

interface SpinnerProps {
    min: number;
    max: number;
    value: number;
    onChange: (newValue: number) => void;
    onDragStop?: (newValue: number) => void;
    onInputBlur?: (newValue: number) => void;
}

const Spinner: React.FC<SpinnerProps> = ({
    min,
    max,
    value,
    onChange,
    onDragStop,
    onInputBlur
}) => {
    const theme = useTheme();

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const val = parseFloat(e.target.value);
        if (Number.isNaN(val)) {
            return;
        }
        const newValue = Math.min(max, Math.max(min, val));
        if (newValue !== val) {
            onChange(newValue);
        } else {
            onChange(parseFloat(e.target.value));
        }
    }

    function handleDown(e: MouseEvent<HTMLDivElement>) {
        const startY = e.pageY;
        const mouseUp = (evt: globalThis.MouseEvent) => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            if (onDragStop) {
                const integerValue = value - (evt.pageY - startY);
                const val = Math.max(min, Math.min(max, integerValue));
                onDragStop(val);
            }
        };
        const mouseMove = (evt: globalThis.MouseEvent) => {
            const changedValue = value - (evt.pageY - startY);
            const val = Math.max(min, Math.min(max, changedValue));
            onChange(val);
        };
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    function handleInputBlur() {
        if (onInputBlur) {
            onInputBlur(value);
        }
    }

    return (
        <SpinnerContainer className="spinner" theme={theme}>
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
            />
            <div className="buttons" onMouseDown={handleDown}>
                <div className="up-button">
                    <MdKeyboardArrowUp size={16} />
                </div>
                <div className="down-button">
                    <MdKeyboardArrowDown size={16} />
                </div>
            </div>
        </SpinnerContainer>
    );
};

export default Spinner;
