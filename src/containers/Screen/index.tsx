import React from 'react';

import StatusBar from './StatusBar';
import Board from './Board';
import ContentBar from '../../components/ContentBar';
import ToolBar from '../../components/ToolBar';

import { Container, ContentContainer } from './styles';

const Screen: React.FC = () => {
    return (
        <Container>
            <ContentContainer>
                <ToolBar />
                <Board />
                <ContentBar />
            </ContentContainer>
            <StatusBar />
        </Container>
    );
};

export default Screen;
