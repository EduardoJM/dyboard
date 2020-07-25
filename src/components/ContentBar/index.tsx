import React, { useState } from 'react';
import { useTransition } from 'react-spring';

import { Container, Content, Bar } from './styles';

import PlotConfigurator from './PlotConfigurator';

import { useTheme } from '../../contexts/theme';
import { useTools } from '../../contexts/tools';

const ContentBar: React.FC = () => {
    const [contentVisible, setContentVisible] = useState(true);
    const theme = useTheme();
    const tools = useTools();
    const contentTransition = useTransition(contentVisible, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    let content = '';
    if (tools.currentElement) {
        content = JSON.stringify(tools.currentElement);
    }

    return (
        <Container>
            {contentTransition.map(({ item, key, props }) => item && (
                <Content theme={theme} style={props} key={key}>
                    { content }
                </Content>
            ))}
            <Bar theme={theme}>
                <span onClick={() => setContentVisible(!contentVisible)}>BBBBB</span>
            </Bar>
        </Container>
    );
};

export default ContentBar;
