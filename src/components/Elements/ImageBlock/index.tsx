import React from 'react';
import { TypedElement } from '../../../lib/board';
import ElementContainer from '../ElementContainer';

import ImageContainer from './styles';

interface ImageBlockProps {
    data: TypedElement<'image'>;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ data }) => {
    return (
        <ElementContainer data={data}>
            <ImageContainer image={data.data.imageContent} />
        </ElementContainer>
    );
};

export default ImageBlock;
