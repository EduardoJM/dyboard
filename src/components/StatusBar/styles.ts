import styled from 'styled-components';

const Container = styled.div`
    user-select: none;

    height: 20px;
    padding: 0 10px;

    display: flex;
    flex-direction: row;

    overflow: hidden;

    > span {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        > svg {
            margin-right: 5px;
        }
    }
`;

export default Container;
