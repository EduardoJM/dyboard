import React, { createRef } from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import Scene3D from './components/Scene3D';
import Toolbar from './components/Toolbar';
import { Container, BlackBoard } from './styles/app';
import { SizeMonitorProvider } from './contexts/sizeMonitor';
import { ToolsContextProvider } from './contexts/tools';

import 'katex/dist/katex.min.css';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
    const boardRef = createRef<HTMLDivElement>();

    return (
        <>
            <Container>
                <ToolsContextProvider>
                    <Toolbar />
                    <BlackBoard ref={boardRef}>
                        <SizeMonitorProvider elementReference={boardRef}>
                            <Scene3D />
                        </SizeMonitorProvider>
                    </BlackBoard>
                </ToolsContextProvider>
            </Container>
            <GlobalStyle />
        </>
    );
};

render(<App />, mainElement);
