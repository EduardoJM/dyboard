import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import Container from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    text: string;
}

const Input: React.FC<InputProps> = ({ name, text, ...props }) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <Container>
            <label htmlFor={name}>{text}</label>
            <input
                ref={inputRef}
                name={name}
                id={name}
                defaultValue={defaultValue}
                {...props}
            />
        </Container>
    );
};

export default Input;
