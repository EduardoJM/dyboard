import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { ipcRenderer } from 'electron';

import { GlobalStyle } from './styles/GlobalStyle';

import StatusBar from './components/StatusBar';
import ToolBar from './components/ToolBar';
import ContentBar from './components/ContentBar';
import Board from './components/Board';
import { Container, ContentContainer } from './styles/app';
import { ToolsContextProvider } from './contexts/tools';
import { BoardContextProvider } from './contexts/board';
import { ThemeContextProvider } from './contexts/theme';

import 'katex/dist/katex.min.css';
import 'react-resizable/css/styles.css';

import '../i18n';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        ipcRenderer.on('setlanguage', (event, arg: { lang: string; }) => {
            i18n.changeLanguage(arg.lang);
        });
    });

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <ThemeContextProvider>
                    <Container>
                        <BoardContextProvider>
                            <ToolsContextProvider>
                                <ContentContainer>
                                    <ToolBar />
                                    <Board />
                                    <ContentBar />
                                </ContentContainer>
                                <StatusBar />
                            </ToolsContextProvider>
                        </BoardContextProvider>
                    </Container>
                </ThemeContextProvider>
                <GlobalStyle />
            </DndProvider>
        </>
    );
};

render(<App />, mainElement);
