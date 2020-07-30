import styled, { css } from 'styled-components';

import { ThemeContextData } from '../../../contexts/theme';

interface ListItemProps{
    theme: ThemeContextData;
    isDragging: boolean;
}

const ListItem = styled.div<ListItemProps>`
    background: transparent;
    color: ${props => props.theme.contentBarListFg};
    transition: all ease 0.3s;
    padding: 4px 8px;

    &.active {
        background: #FF0;

        background: ${props => props.theme.contentBarListItemBg};
        color: ${props => props.theme.contentBarListItemFg};
    }

    ${props => props.isDragging && css`
        cursor: grabbing;
    `}
`;

export default ListItem;
