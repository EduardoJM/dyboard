import styled from 'styled-components';
import { ThemeContextData } from '../../../contexts/theme';

export const Container = styled.div`
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .fit-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        span {
            cursor: pointer;
        }
    }
`;

interface ImageContentProps {
    src: string;
}

export const ImageContent = styled.div<ImageContentProps>`
    width: 100%;
    height: 100%;

    background: url(${props => props.src});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`;

interface ImageDropzoneProps {
    theme: ThemeContextData;
}

export const ImageDropzone = styled.div<ImageDropzoneProps>`
    margin: 20px 0;

    flex: 1;

    border: 2px solid ${props => props.theme.imageSelectorBorder};
    background: ${props => props.theme.imageSelectorBg};
    color: ${props => props.theme.imageSelectorFg};

    display: flex;
    align-items: center;
    justify-content: center;

    .drop-zone-content {
        text-align: center;
        font-size: 16px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        svg {
            margin-bottom: 20px;
        }
    }
`;

export const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
