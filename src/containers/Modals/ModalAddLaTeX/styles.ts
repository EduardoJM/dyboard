import styled from 'styled-components';

export const LatexEditor = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 20px;

    textarea {
        width: 100%;
        height: 200px;
    }

    .preview {
        flex: 1;
        padding: 20px;

        .preview-content {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
    }
`;

export const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
