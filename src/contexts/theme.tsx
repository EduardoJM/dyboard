import React, { useContext, useState, createContext } from 'react';
import omni from '../data/omniTheme';

export interface ThemeContextData {
    bg: string;
    fg: string;

    elementDragDecorator: string;
    elementDragOpacity: number;
    elementDragRadius: number;
    elementResizeDecorator: string;

    toolBarBg: string;
    toolBarFg: string;
    toolBarFgActive: string;
    toolBarBorderActive: string;
    toolBarDeep: string;

    statusBarBg: string;
    statusBarFg: string;

    modalBg: string;
    modalFg: string;
    modalBorder: string;
    modalActiveButtonBg: string;
    modalActiveButtonFg: string;

    switchBg: string;
    switchBgAccent: string;
    switchCheckedBg: string;
    switchCheckedBgAccent: string;

    buttonBg: string;
    buttonFg: string;
    buttonBorder: string;
    buttonHoverBg: string;
    buttonHoverFg: string;
    buttonHoverBorder: string;

    textEditorBg: string;
    textEditorBorder: string;
    textEditorSeparatorBorder: string;
    textEditorButtonFg: string;
    textEditorButtonHoverFg: string;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeContextProvider: React.FC = ({
    children
}) => {
    const [currentTheme] = useState<ThemeContextData>(omni);

    return (
        <ThemeContext.Provider value={currentTheme}>
            { children }
        </ThemeContext.Provider>
    );
};

export default ThemeContext;

export function useTheme() : ThemeContextData {
    const context = useContext(ThemeContext);

    return context;
}
