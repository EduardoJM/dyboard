import React from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import StatusBar from './components/StatusBar';
import ToolBar from './components/ToolBar';
import Board from './components/Board';
import { Container, ContentContainer } from './styles/app';
import { ToolsContextProvider } from './contexts/tools';
import { BoardContextProvider } from './contexts/board';
import { ThemeContextProvider } from './contexts/theme';

import 'katex/dist/katex.min.css';
import 'react-resizable/css/styles.css';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
    return (
        <>
            <ThemeContextProvider>
                <Container>
                    <BoardContextProvider>
                        <ToolsContextProvider>
                            <ContentContainer>
                                <ToolBar />
                                <Board />
                            </ContentContainer>
                            <StatusBar />
                        </ToolsContextProvider>
                    </BoardContextProvider>
                </Container>
            </ThemeContextProvider>
            <GlobalStyle />
        </>
    );
};

render(<App />, mainElement);
