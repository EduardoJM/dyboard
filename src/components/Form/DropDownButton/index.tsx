import React, { useState } from 'react';
import { useTransition } from 'react-spring';
import useEventListener from '@use-it/event-listener';

import { Container, DropDownContainer } from './styles';

interface DropDownButton {
    key: string;
    label: string;
    click: () => void;
}

interface DropDownButtonProps {
    renderDropDown?: () => JSX.Element;
    dropDownButtons?: DropDownButton[];
}

const DropDownButton: React.FC<DropDownButtonProps> = ({
    children,
    renderDropDown,
    dropDownButtons
}) => {
    const [dropDownState, setDropDownState] = useState(false);
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

    const content = dropDownButtons
        ? dropDownButtons.map((button) => (
            <button key={button.key} type="button" onClick={button.click}>
                {button.label}
            </button>
        ))
        : (renderDropDown ? renderDropDown() : null);

    return (
        <Container>
            <span
                onClick={handleToggleDropDown}
            >
                {children}
            </span>
            {transitions.map(
                ({ item, key, props }) => item && (
                    <DropDownContainer
                        key={key}
                        style={props}
                    >
                        {content}
                    </DropDownContainer>
                )
            )}
        </Container>
    );
};

export default DropDownButton;
