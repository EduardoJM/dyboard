import React from 'react';

import { useBoard } from '../../contexts/board';

import Container from './styles';
import renderElement from './renderer';

const Board: React.FC = () => {
    const boardData = useBoard();

    return (
        <Container>
            {boardData.elements.map((element) => renderElement(element))}
        </Container>
    );
};

export default Board;
