import React from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import Scene3D from './components/Scene3D';

import 'katex/dist/katex.min.css';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
    return (
        <>
            <Scene3D />

            <GlobalStyle />
        </>
    );
};

render(<App />, mainElement);
