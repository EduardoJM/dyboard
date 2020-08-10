import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 10px;

    > span {
        cursor: pointer;

        padding: 3px 0;

        display: flex;
        align-items: center;
        justify-content: flex-start;

        svg {
            width: 24px;
            height: 24px;
            margin-left: -8px;
        }
    }

    .config-content {
        padding: 5px;
    }
`;

export default Container;
