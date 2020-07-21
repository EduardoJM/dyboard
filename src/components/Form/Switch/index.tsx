import React from 'react';
import { useTransition, useSpring } from 'react-spring';

import { Container, GrayBar, ColoredBar, Marker } from './styles';

interface SwitchProps {
    checked: boolean;
    handleCheckChange: (checkValue: boolean) => void;
    text: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, handleCheckChange, text }) => {
    const transitions = useTransition(checked, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });
    const markerProps = useSpring({
        left: checked ? 30 : -10
    });

    return (
        <Container onClick={() => handleCheckChange(!checked)}>
            <span>{ text }</span>
            <GrayBar>
                {transitions.map(
                    ({ item, key, props: style }) => item && (
                        <ColoredBar
                            key={key}
                            style={style}
                        />
                    )
                )}
                <Marker
                    style={{
                        ...markerProps,
                        backgroundColor: checked ? '#90caf9' : '#bdbdbd'
                    }}
                />
            </GrayBar>
        </Container>
    );
};

export default Switch;
