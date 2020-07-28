import styled from 'styled-components';

export const Container = styled.ul`
    display: block;
    padding: 5px;
    margin-bottom: 10px;

    > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        > .color-box {
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
    }
`;

export const ButtonArea = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
