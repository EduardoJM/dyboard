import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        color: #E1E1E6;
    }

    #root {
        width: 100%;
        height: 100vh;
    }

    .no-select {
        user-select: none;
    }

    .draggable-element {
        position: absolute;
        width: auto;
    }
`;
