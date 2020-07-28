import React, { createRef, useState, MouseEvent } from 'react';
import { useTransition, animated } from 'react-spring';

import { Container, TextBlock } from './styles';

import { useTheme } from '../../../contexts/theme';

interface SliderProps {
    text: string;
    min: number;
    max: number;
    value: number;
    onValueChange: (newValue: number) => void;
}

const Slider: React.FC<SliderProps> = ({
    text,
    min,
    max,
    value,
    onValueChange
}) => {
    const sliderRef = createRef<HTMLDivElement>();
    const [dragging, setDragging] = useState(false);
    const transitions = useTransition(dragging, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });
    const theme = useTheme();

    function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
        if (!sliderRef.current) {
            return;
        }
        const rc = sliderRef.current.getBoundingClientRect();
        const x = e.pageX - rc.left;
        const width = rc.width;
        let newValue = (x / width) * (max - min) + min;
        newValue = Math.min(max, Math.max(min, Math.round(newValue)));
        onValueChange(newValue);
        setDragging(true);
        const handleMouseMove = (evt: globalThis.MouseEvent) => {
            const x = evt.pageX - rc.left;
            newValue = (x / width) * (max - min) + min;
            newValue = Math.min(max, Math.max(min, Math.round(newValue)));
            onValueChange(newValue);
        };
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            setDragging(false);
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
