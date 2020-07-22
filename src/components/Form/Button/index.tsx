import React, { MouseEvent } from 'react';
import Container from './styles';

interface ButtonProps {
    onClick: ((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void) | undefined;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <Container type="button" onClick={onClick}>
            {children}
        </Container>
    );
};

export default Button;
