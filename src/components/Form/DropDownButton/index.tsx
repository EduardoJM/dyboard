import React, { useState, createRef, useEffect } from 'react';
import { useTransition } from 'react-spring';

import { Container, DropDownContainer } from './styles';

interface DropDownButtonProps {
    dropDown: JSX.Element;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({
    children,
    dropDown
}) => {
    const dropDownRef = createRef<HTMLDivElement>();
    const [display, setDisplay] = useState(false);
    const [numbers, setNumbers] = useState(0);
    const transitions = useTransition(display, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    function showDropDown() {
        setDisplay(true);
        setNumbers(numbers + 1);
        if (dropDownRef.current) {
            dropDownRef.current.focus();
        }
    }

    function blurDropDown() {
        if (numbers === 1) {
            setDisplay(false);
        }
        setNumbers(numbers - 1);
    }

    useEffect(() => {
        if (dropDownRef.current && numbers > 0) {
            dropDownRef.current.focus();
        }
    }, [dropDownRef]);

    return (
        <Container>
            <button onClick={showDropDown}>{children}</button>
            {transitions.map(
                ({ item, key, props }) => item && (
                    <DropDownContainer
                        ref={dropDownRef}
                        key={key}
                        style={props}
                        tabIndex={-1}
                        onBlur={blurDropDown}
                    >
                        {dropDown}
                    </DropDownContainer>
                )
            )}
        </Container>
    );
};

export default DropDownButton;
