import React from 'react';
import { ElementImage } from '../../../data/board';
import ElementContainer from '../ElementContainer';

import ImageContainer from './styles';

interface ImageBlockProps {
    data: ElementImage;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ data }) => {
    return (
        <ElementContainer data={data}>
            <ImageContainer image={data.imageContent} />
        </ElementContainer>
    );
};

export default ImageBlock;
