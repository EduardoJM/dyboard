import React, { useEffect, createRef, MouseEvent } from 'react';
import katex from 'katex';

interface KatexOutputProps {
    content: string;
    onClick: (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
}

const KatexOutput: React.FC<KatexOutputProps> = ({
    content,
    onClick
}) => {
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        if (!ref || !ref.current) {
            return;
        }
        katex.render(
            content,
            ref.current,
            { displayMode: true }
        );
    }, [content]);

    return <div ref={ref} onClick={onClick} />;
};

export default KatexOutput;
