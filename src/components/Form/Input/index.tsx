import React, { InputHTMLAttributes } from 'react';

import Container from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    text: string;
}

const Input: React.FC<InputProps> = ({ name, text, ...props }) => {
    return (
        <Container>
            <label htmlFor={name}>{text}</label>
            <input name={name} id={name} {...props} />
        </Container>
    );
};

export default Input;
