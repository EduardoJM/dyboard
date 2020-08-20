import styled from 'styled-components';
import { ThemeContextData } from '../../../contexts/theme';

interface ContainerProps {
    theme: ThemeContextData;
}

const Container = styled.div<ContainerProps>`

    .heading {
        text-transform: uppercase;
        padding: 10px 5px;

        background: ${props => props.theme.contentBarPanelHeadingBg};
        color: ${props => props.theme.contentBarPanelHeadingFg}
    }
    
    .toolset {
        padding: 5px;

        button {
            color: ${props => props.theme.contentBarPanelFg};
            padding: 5px;

            transition: background-color 0.2s;

            svg {
                width: 16px;
                height: auto;
            }

            &:hover {
                background: rgba(255, 255, 255, 0.1);
            }
        }
    }
`;

export default Container;
