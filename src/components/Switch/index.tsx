import React, { useState } from 'react';
import { useTransition, useSpring } from 'react-spring';

import { Container, GrayBar, ColoredBar, Marker } from './styles';

interface SwitchProps {
    checked: boolean;
    text: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, text }) => {
    const [state, setState] = useState(false);
    const transitions = useTransition(state, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });
    const markerProps = useSpring({
        left: state ? 30 : -10
    });

    return (
        <Container onClick={() => setState(!state)}>
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
                        backgroundColor: state ? '#90caf9' : '#bdbdbd'
                    }}
                />
            </GrayBar>
        </Container>
    );
};

export default Switch;
