import React, { useEffect, useRef, useState } from 'react';
import { useSpring } from 'react-spring';
import { useField } from '@unform/core';

import { useTheme } from '../../../contexts/theme';

import { Container, GrayBar, Marker } from './styles';

interface SwitchProps {
    name: string;
    text: string;
    initialCheck: boolean;
}

const Switch: React.FC<SwitchProps> = ({ name, text, initialCheck }) => {
    const inputRef = useRef(null);
    const { fieldName, registerField } = useField(name);
    const [state, setState] = useState(initialCheck);
    const markerProps = useSpring({
        left: state ? 16 : 0
    });
    const theme = useTheme();

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            getValue: (ref: HTMLDivElement) => {
                if (ref.dataset.checked === undefined) {
                    return 'false';
                }
                return ref.dataset.checked;
            }
        });
    }, [fieldName, registerField]);

    return (
        <Container
            className="control-switch"
            ref={inputRef}
            data-checked={state}
            onClick={() => setState(!state)}
        >
            <span>{ text }</span>
            <GrayBar
                theme={theme}
                checked={state}
            >
                <Marker
                    style={{
                        ...markerProps,
                        backgroundColor: state
                            ? theme.switchCheckedBgAccent
                            : theme.switchBgAccent
                    }}
                />
            </GrayBar>
        </Container>
    );
};

export default Switch;
