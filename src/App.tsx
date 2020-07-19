import React, { useState } from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import MathExpression from './components/MathExpression';
import Modal from './components/Modal';

import 'katex/dist/katex.min.css';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
    const [modal, setModal] = useState(false);

    return (
        <>
            <MathExpression />

            <button onClick={() => setModal(true)}>Abrir</button>

            <Modal title="Modal 1" visible={modal} closeModalRequest={() => setModal(false)}>
                <h2>Esse é o meu modal</h2>

                <button onClick={() => setModal(false)}>Fechar</button>
            </Modal>

            <GlobalStyle />
        </>
    );
};

render(<App />, mainElement);
