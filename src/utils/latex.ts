import katex from 'katex';

export const inlineLatexRegex = /\\\([\s\S]+?\\\)|\$[\s\S]+?\$/g;

export function stripDollars(stringToStrip: string): string {
    if (stringToStrip[0] === '$' && stringToStrip[1] !== '$') {
        return stringToStrip.slice(1, -1);
    }
    return stringToStrip.slice(2, -2);
};

export function renderLatexString(s: string): string {
    let renderedString;
    try {
        renderedString = katex.renderToString(s);
    } catch (err) {
        return s;
    }
    return renderedString;
};

export function renderInlineLaTeX(text: string): string {
    const result: string[] = [];
    const latexMatch = text.match(inlineLatexRegex);
    const stringWithoutLatex = text.split(inlineLatexRegex);
    if (latexMatch) {
        stringWithoutLatex.forEach((s: string, index: number) => {
            result.push(s);
            if (latexMatch[index]) {
                result.push(renderLatexString(stripDollars(latexMatch[index])));
            }
        });
    } else {
        result.push(text);
    }
    return result.join('');
}
