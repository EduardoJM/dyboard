import React, { createRef } from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import StatusBar from './components/StatusBar';
import Toolbar from './components/Toolbar';
import { Container, ContentContainer, BlackBoard } from './styles/app';
import { SizeMonitorProvider } from './contexts/sizeMonitor';
import { ToolsContextProvider } from './contexts/tools';

import TextBlock from './components/Elements/TextBlock';

import 'katex/dist/katex.min.css';
import 'react-resizable/css/styles.css';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
    const boardRef = createRef<HTMLDivElement>();

    return (
        <>
            <Container>
                <ToolsContextProvider>
                    <ContentContainer>
                        <Toolbar />
                        <BlackBoard ref={boardRef}>
                            <SizeMonitorProvider elementReference={boardRef}>
                                <TextBlock supportLatex={true}>
                                    What is this? looook hahahahhaha. Seja
                                    $$
                                        x = \pm x^2+2xa + c^2
                                    $$
                                </TextBlock>
                            </SizeMonitorProvider>
                        </BlackBoard>
                    </ContentContainer>
                    <StatusBar />
                </ToolsContextProvider>
            </Container>
            <GlobalStyle />
        </>
    );
};

render(<App />, mainElement);
