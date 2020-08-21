import styled from 'styled-components';

interface ImageContainerProps {
    image: string;
}

const ImageContainer = styled.div<ImageContainerProps>`
    width: 100%;
    height: 100%;
    background: url(${props => props.image});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;

export default ImageContainer;
