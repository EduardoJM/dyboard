import React from 'react';
import { ElementText } from '../../../data/board';

import ElementContainer from '../ElementContainer';

interface TextBlockProps {
    data: ElementText;
}

const TextBlock: React.FC<TextBlockProps> = ({ data }) => {
    return (
        <ElementContainer data={data}>
            <div dangerouslySetInnerHTML={{ __html: data.text }} />
        </ElementContainer>
    );
};

export default TextBlock;
