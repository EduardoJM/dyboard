import styled from 'styled-components';

export const Form = styled.div`
    padding: 10px 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
`;

export const TextWriter = styled.div`
    flex: 1;
    padding: 5px;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    > div {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;

        padding: 5px 0;

        &:first-child {
            flex: 1;
        }

        &:last-child{
            height: 50%;
            border-top: 1px solid #333;
        }
    }
`;

export const TextEditor = styled.textarea`
    flex: 1;
    resize: none;
`;

export const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Viewer = styled.div`
    flex: 1;
    background: #F00;
`;
