import React, { useEffect, useCallback } from 'react';
import { render } from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { ipcRenderer } from 'electron';
import { Provider } from 'react-redux';

import store from './redux/store';

import { GlobalStyle } from './styles/GlobalStyle';

import Screen from './containers/Screen';
import { ThemeContextProvider } from './contexts/theme';

import Modals from './containers/Modals';

import 'katex/dist/katex.min.css';
import 'react-resizable/css/styles.css';

import '../i18n';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
    const { i18n } = useTranslation();

    const setLanguage = useCallback((event, arg: { lang: string; }) => {
        i18n.changeLanguage(arg.lang);
    }, []);

    useEffect(() => {
        ipcRenderer.on('setlanguage', setLanguage);
        return () => {
            ipcRenderer.off('setlanguage', setLanguage);
        };
    });

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <ThemeContextProvider>
                    <Provider store={store}>
                        <Screen />
                        <Modals />
                    </Provider>
                </ThemeContextProvider>
            </DndProvider>
            <GlobalStyle />
        </>
    );
};

render(<App />, mainElement);
