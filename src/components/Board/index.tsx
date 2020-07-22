import React, { createRef, MouseEvent } from 'react';

import { useBoard } from '../../contexts/board';
import { useTools } from '../../contexts/tools';

import Container from './styles';
import renderElement from './renderer';

const Board: React.FC = () => {
    const boardRef = createRef<HTMLDivElement>();
    const boardData = useBoard();
    const tools = useTools();

    function handleClick(e: MouseEvent) {
        if (tools.elementToAdd && boardRef && boardRef.current) {
            const { pageX, pageY } = e;
            const rc = boardRef.current.getBoundingClientRect();
            const x = pageX - rc.left;
            const y = pageY - rc.top;
            tools.catchedClick(x, y);
        }
    }

    return (
        <Container
            ref={boardRef}
            onClick={handleClick}
            catching={tools.elementToAdd !== null}
        >
            {boardData.elements.map((element) => renderElement(element))}
        </Container>
    );
};

export default Board;
