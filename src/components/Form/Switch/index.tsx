import React from 'react';
import { useSpring } from 'react-spring';

import { useTheme } from '../../../contexts/theme';

import { Container, GrayBar, Marker } from './styles';

interface SwitchProps {
    checked: boolean;
    handleCheckChange: (checkValue: boolean) => void;
    text: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, handleCheckChange, text }) => {
    const markerProps = useSpring({
        left: checked ? 16 : 0
    });
    const theme = useTheme();

    return (
        <Container onClick={() => handleCheckChange(!checked)}>
            <span>{ text }</span>
            <GrayBar theme={theme} checked={checked}>
                <Marker
                    style={{
                        ...markerProps,
                        backgroundColor: checked
                            ? theme.switchCheckedBgAccent
                            : theme.switchBgAccent
                    }}
                />
            </GrayBar>
        </Container>
    );
};

export default Switch;
