import React from 'react';
import { useTransition } from 'react-spring';
import useEventListener from '@use-it/event-listener';

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

    useEventListener('mousedown', () => {
        if (!dropDownState) {
            return;
        }
        setDropDownState(false);
    }, document);

    function handleToggleDropDown() {
        setDropDownState(!dropDownState);
    }

    return (
        <Container>
            <li
                onClick={handleToggleDropDown}
            >
                {children}
            </li>
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
        </Container>
    );
};

export default DropDownButton;
