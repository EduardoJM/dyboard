import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`;

export const ContentContainer = styled.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
`;
