import React, { useState } from 'react';
import { useTransition } from 'react-spring';

import { Container, DropDownContainer } from './styles';

interface DropDownButtonProps {
    dropDown: JSX.Element;
    dropDownState: boolean;
    setDropDownState: (value: boolean) => void;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({
    children,
    dropDown,
    dropDownState,
    setDropDownState
}) => {
    const transitions = useTransition(dropDownState, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    return (
        <Container>
            <li
                tabIndex={-1}
                onFocus={() => setDropDownState(true)}
                onBlur={() => setDropDownState(false)}
            >
                {children}
                {transitions.map(
                    ({ item, key, props }) => item && (
                        <DropDownContainer
                            key={key}
                            style={props}
                        >
                            {dropDown}
                        </DropDownContainer>
                    )
                )}
            </li>
        </Container>
    );
};

export default DropDownButton;
