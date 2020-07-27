import React, { useState } from 'react';
import { useTransition } from 'react-spring';

import { Container, Content, Bar } from './styles';

import PlotConfigurator from './PlotConfigurator';

import { ElementPlot } from '../../data/board';

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

    function renderContent(): JSX.Element | null {
        if (tools.currentElement === null) {
            return null;
        } else if (tools.currentElement.type === 'plot') {
            return <PlotConfigurator data={tools.currentElement as ElementPlot} />;
        }
        return null;
    }

    return (
        <Container>
            {contentTransition.map(({ item, key, props }) => item && (
                <Content theme={theme} style={props} key={key}>
                    {renderContent()}
                </Content>
            ))}
            <Bar theme={theme}>
                <span onClick={() => setContentVisible(!contentVisible)}>BBBBB</span>
            </Bar>
        </Container>
    );
};

export default ContentBar;
