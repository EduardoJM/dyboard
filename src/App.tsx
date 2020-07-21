import React, { createRef } from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import Latex from './components/Latex';
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

    const str = 'The <b style="color: red">value</b> of $x$ is $$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$$';

    return (
        <>
            <Container>
                <ToolsContextProvider>
                    <Toolbar />
                    <BlackBoard ref={boardRef}>
                        <SizeMonitorProvider elementReference={boardRef}>
                            <Latex>{ str }</Latex>
                        </SizeMonitorProvider>
                    </BlackBoard>
                </ToolsContextProvider>
            </Container>
            <GlobalStyle />
        </>
    );
};

render(<App />, mainElement);
