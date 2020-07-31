import React, { ChangeEvent, MouseEvent } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import Container from './styles';

import { useTheme } from '../../../contexts/theme';

interface SpinnerProps {
    width?: number;

    min: number;
    max: number;
    value: number;
    onChange: (newValue: number) => void;
}

const Spinner: React.FC<SpinnerProps> = ({
    width,

    min,
    max,
    value,
    onChange
}) => {
    const theme = useTheme();

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const val = parseInt(e.target.value, 10);
        if (Number.isNaN(val)) {
            return;
        }
        const newValue = Math.min(max, Math.max(min, val));
        onChange(newValue);
    }

    function handleDown(e: MouseEvent<HTMLDivElement>) {
        const startY = e.pageY;
        const mouseUp = () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };
        const mouseMove = (evt: globalThis.MouseEvent) => {
            const integerValue = Math.round(value - (evt.pageY - startY));
            const val = Math.max(min, Math.min(max, integerValue));
            onChange(val);
        };
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    return (
        <Container width={width} theme={theme}>
            <input
                type="text"
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
    );
};

export default Spinner;
