import React from 'react';
import katex, { KatexOptions } from 'katex';

const parseContent = (text: string, options: KatexOptions): JSX.Element[] => {
    // eslint-disable-next-line no-useless-escape
    const regularExpression = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^\$\\]*(?:\\.[^\$\\]*)*\$/g;
    const blockRegularExpression = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]/g;

    const stripDollars = (stringToStrip: string) => {
        if (stringToStrip[0] === '$' && stringToStrip[1] !== '$') {
            return stringToStrip.slice(1, -1);
        }
        return stringToStrip.slice(2, -2);
    };

    const getDisplay = (stringToDisplay: string) => {
        if (stringToDisplay.match(blockRegularExpression)) {
            return 'block';
        }
        return 'inline';
    };

    const renderLatexString = (s: string, t: 'block' | 'inline') => {
        let renderedString;
        try {
            // returns HTML markup
            renderedString = katex.renderToString(
                s,
                t === 'block' ? Object.assign({ displayMode: true }, options) : options
            );
        } catch (err) {
            console.error('couldn`t convert string ', s);
            return s;
        }
        return renderedString;
    };

    const result: {
        string: string;
        type: 'text' | 'block' | 'inline'
    }[] = [];

    const latexMatch = text.match(regularExpression);
    const stringWithoutLatex = text.split(regularExpression);

    if (latexMatch) {
        stringWithoutLatex.forEach((s: string, index: number) => {
            result.push({
                string: s,
                type: 'text'
            });
            if (latexMatch[index]) {
                result.push({
                    string: stripDollars(latexMatch[index]),
                    type: getDisplay(latexMatch[index])
                });
            }
        });
    } else {
        result.push({
            string: text,
            type: 'text'
        });
    }

    const processResult = (resultToProcess: {
        string: string;
        type: string;
    }[]) : JSX.Element[] => {
        const newResult = resultToProcess.map((r) => {
            if (r.type === 'block' || r.type === 'inline') {
                return (
                    <span
                        key={r.string}
                        dangerouslySetInnerHTML={{ __html: renderLatexString(r.string, r.type) }}
                    />
                );
            }
            return (
                <span
                    key={r.string}
                    dangerouslySetInnerHTML={{ __html: r.string }}
                />
            );
        });
        return newResult;
    };

    // Returns list of spans with latex and non-latex strings.
    return processResult(result);
};

export default parseContent;
