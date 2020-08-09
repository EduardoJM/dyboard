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

    imageSelectorBg: string;
    imageSelectorFg: string;
    imageSelectorBorder: string;

    switchBg: string;
    switchBgAccent: string;
    switchCheckedBg: string;
    switchCheckedBgAccent: string;

    sliderBar: string;
    sliderButton: string;
    sliderPopupBg: string;
    sliderPopupFg: string;

    spinnerBg: string;
    spinnerFg: string;
    spinnerButtonsBg: string;
    spinnerButtonsFg: string;

    buttonBg: string;
    buttonFg: string;
    buttonBorder: string;
    buttonHoverBg: string;
    buttonHoverFg: string;
    buttonHoverBorder: string;

    selectPrimary: string;
    selectPrimary75: string;
    selectPrimary50: string;
    selectPrimary25: string;
    selectDanger: string;
    selectDangerLight: string;
    selectNeutral0: string;
    selectNeutral5: string;
    selectNeutral10: string;
    selectNeutral20: string;
    selectNeutral30: string;
    selectNeutral40: string;
    selectNeutral50: string;
    selectNeutral60: string;
    selectNeutral70: string;
    selectNeutral80: string;
    selectNeutral90: string;

    textEditorBg: string;
    textEditorBorder: string;
    textEditorSeparatorBorder: string;
    textEditorButtonFg: string;
    textEditorButtonHoverFg: string;

    textEditorEditPanelBg: string;
    textEditorEditPanelFg: string;
    textEditorEditPanelRadius: number;
    textEditorEditPanelButtonBg: string;
    textEditorEditPanelButtonFg: string;
    textEditorEditPanelButtonBorder: string;
    textEditorEditPanelButtonHoverBg: string;
    textEditorEditPanelButtonHoverFg: string;
    textEditorEditPanelButtonHoverBorder: string;

    contentBarBg: string;
    contentBarFg: string;
    contentBarPanelBg: string;
    contentBarPanelFg: string;
    contentBarPanelHeadingBg: string;
    contentBarPanelHeadingFg: string;
    contentBarListBg: string;
    contentBarListFg: string;
    contentBarListItemBg: string;
    contentBarListItemFg: string;
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
