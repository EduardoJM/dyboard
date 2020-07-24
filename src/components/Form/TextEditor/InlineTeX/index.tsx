import React, { useState, useEffect, createRef } from 'react';
import { useTransition } from 'react-spring';
import katex from 'katex';

import { InlineMath, Popup } from './styles';

const InlineTeX: React.FC = ({ children }) => {
    const [mouse, setMouse] = useState(false);
    const [tex, setTex] = useState('');
    const [texError, setTexError] = useState(false);
    const spanRef = createRef<HTMLSpanElement>();
    const toolTipTransitions = useTransition(mouse, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    // TODO: use the useMeasure and create an context to make the
    // display tooltips not expand out of the editor container

    const handleMouseEnter = () => {
        setMouse(true);
    };

    const handleMouseLeave = () => {
        setMouse(false);
    };

    useEffect(() => {
        const stripDollars = (stringToStrip: string) => {
            if (stringToStrip[0] === '$' && stringToStrip[1] !== '$') {
                return stringToStrip.slice(1, -1);
            }
            return stringToStrip.slice(2, -2);
        };

        if (!spanRef || !spanRef.current) {
            return;
        }
        const text = stripDollars(spanRef.current.innerText);
        let invalid = false;
        let latex = '';
        try {
            latex = katex.renderToString(text);
        } catch (e) {
            invalid = true;
            latex = 'Tex Invalido!';
        } finally {
            setTexError(invalid);
            setTex(latex);
        }
    }, [children, spanRef.current]);

    return (
        <InlineMath
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            error={texError}
        >
            <span className="text" ref={spanRef}>
                {children}
            </span>
            {toolTipTransitions.map(
                ({ item, key, props: style }) => item && (
                    <Popup
                        key={key}
                        style={style}
                        dangerouslySetInnerHTML={{ __html: tex }}
                    />
                )
            )}
        </InlineMath>
    );
};

export default InlineTeX;
