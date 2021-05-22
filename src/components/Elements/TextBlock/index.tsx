import React from 'react';
import { TypedElement } from '../../../lib/board';

import ElementContainer from '../ElementContainer';

interface TextBlockProps {
    data: TypedElement<'text'>;
}

const TextBlock: React.FC<TextBlockProps> = ({ data }) => {
    return (
        <ElementContainer data={data}>
            <div dangerouslySetInnerHTML={{ __html: data.data.text }} />
        </ElementContainer>
    );
};

export default TextBlock;
