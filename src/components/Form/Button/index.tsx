import React, { MouseEvent } from 'react';

import { useTheme } from '../../../contexts/theme';

import Container from './styles';

interface ButtonProps {
    onClick: ((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void) | undefined;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    const theme = useTheme();

    return (
        <Container type="button" theme={theme} onClick={onClick}>
            {children}
        </Container>
    );
};

export default Button;
