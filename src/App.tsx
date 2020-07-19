import React from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import MathExpression from './components/MathExpression';

import 'katex/dist/katex.min.css';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
    return (
        <>
            <MathExpression />
            <GlobalStyle />
        </>
    );
};

render(<App />, mainElement);
