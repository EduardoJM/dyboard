import React, { useState, useEffect } from 'react';
import parseContent from './parser';

export interface TrustContext {
    command: string
    url: string
    protocol: string
}

export interface LatexProps {
    children?: string;
    /**
     * If `true`, math will be rendered in display mode
     * (math in display style and center math on page)
     *
     * If `false`, math will be rendered in inline mode
     * @default false
     */
    displayMode?: boolean;
    /**
     * Determines the markup language of the output. The valid choices are:
     * - `html`: Outputs KaTeX in HTML only.
     * - `mathml`: Outputs KaTeX in MathML only.
     * - `htmlAndMathml`: Outputs HTML for visual rendering
     *   and includes MathML for accessibility.
     *
     * @default 'htmlAndMathml'
     */
    output?: 'html' | 'mathml' | 'htmlAndMathml';
    /**
     * If `true`, display math has \tags rendered on the left
     * instead of the right, like \usepackage[leqno]{amsmath} in LaTeX.
     *
     * @default false
     */
    leqno?: boolean;
    /**
     * If `true`, display math renders flush left with a 2em left margin,
     * like \documentclass[fleqn] in LaTeX with the amsmath package.
     *
     * @default false
     */
    fleqn?: boolean;
    /**
     * If `true`, KaTeX will throw a `ParseError` when
     * it encounters an unsupported command or invalid LaTex
     *
     * If `false`, KaTeX will render unsupported commands as
     * text, and render invalid LaTeX as its source code with
     * hover text giving the error, in color given by errorColor
     * @default true
     */
    throwOnError?: boolean;
    /**
     * A Color string given in format `#XXX` or `#XXXXXX`
     */
    errorColor?: string;
    /**
     * A collection of custom macros.
     *
     * See `src/macros.js` for its usage
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    macros?: any;
    /**
     * Specifies a minimum thickness, in ems, for fraction lines,
     * \sqrt top lines, {array} vertical lines, \hline, \hdashline,
     * \underline, \overline, and the borders of \fbox, \boxed, and
     * \fcolorbox.
     */
    minRuleThickness?: number;
    /**
     * If `true`, `\color` will work like LaTeX's `\textcolor`
     * and takes 2 arguments
     *
     * If `false`, `\color` will work like LaTeX's `\color`
     * and takes 1 argument
     *
     * In both cases, `\textcolor` works as in LaTeX
     *
     * @default false
     */
    colorIsTextColor?: boolean;
    /**
     * All user-specified sizes will be caped to `maxSize` ems
     *
     * If set to Infinity, users can make elements and space
     * arbitrarily large
     *
     * @default Infinity
     */
    maxSize?: number;
    /**
     * Limit the number of macro expansions to specified number
     *
     * If set to `Infinity`, marco expander will try to fully expand
     * as in LaTex
     *
     * @default 1000
     */
    maxExpand?: number;
    /**
     * If `false` or `"ignore"`, allow features that make
     * writing in LaTex convenient but not supported by LaTex
     *
     * If `true` or `"error"`, throw an error for such transgressions
     *
     * If `"warn"`, warn about behavior via `console.warn`
     *
     * @default "warn"
     */
    strict?: boolean | string;
    /**
     * If `false` (do not trust input), prevent any commands that could enable adverse behavior, rendering them instead in errorColor.
     *
     * If `true` (trust input), allow all such commands.
     *
     * @default false
     */
    trust?: boolean | ((context: TrustContext) => boolean);
    /**
     * Place KaTeX code in the global group.
     *
     * @default false
     */
    globalGroup?: boolean;
}

const Latex: React.FC<LatexProps> = ({
    children,
    displayMode,
    output,
    leqno,
    fleqn,
    throwOnError,
    errorColor,
    macros,
    minRuleThickness,
    colorIsTextColor,
    maxSize,
    maxExpand,
    strict,
    trust,
    globalGroup
}) => {
    const [rendered, setRendered] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setRendered(parseContent(children as string, {
            displayMode,
            output,
            leqno,
            fleqn,
            throwOnError,
            errorColor,
            macros,
            minRuleThickness,
            colorIsTextColor,
            maxSize,
            maxExpand,
            strict,
            trust,
            globalGroup
        }));
        /*
        setRendered(katex.renderToString(children as string, {
            displayMode,
            output,
            leqno,
            fleqn,
            throwOnError,
            errorColor,
            macros,
            minRuleThickness,
            colorIsTextColor,
            maxSize,
            maxExpand,
            strict,
            trust,
            globalGroup
        }));
        */
    }, [
        children,
        displayMode,
        output,
        leqno,
        fleqn,
        throwOnError,
        errorColor,
        macros,
        minRuleThickness,
        colorIsTextColor,
        maxSize,
        maxExpand,
        strict,
        trust,
        globalGroup
    ]);

    return (
        <>
            {rendered}
        </>
    );
};

export default Latex;
