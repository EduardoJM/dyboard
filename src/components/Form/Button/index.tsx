import React, { MouseEvent } from 'react';

import { useTheme } from '../../../contexts/theme';

import { Container, TransparentContainer } from './styles';

interface ButtonProps {
    buttonType?: 'common' | 'transparent';
    onClick: ((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void) | undefined;
}

const Button: React.FC<ButtonProps> = ({
    children,
    buttonType,
    onClick
}) => {
    const theme = useTheme();

    if (buttonType === undefined || buttonType === 'common') {
        return (
            <Container type="button" theme={theme} onClick={onClick}>
                {children}
            </Container>
        );
    } else {
        return (
            <TransparentContainer type="button" onClick={onClick}>
                {children}
            </TransparentContainer>
        );
    }
};

export default Button;
