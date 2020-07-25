import React, { createRef, MouseEvent } from 'react';

import { useBoard } from '../../contexts/board';
import { useTools } from '../../contexts/tools';
import { useTheme } from '../../contexts/theme';

import Container from './styles';
import renderElement from './renderer';

const Board: React.FC = () => {
    const boardRef = createRef<HTMLDivElement>();
    const boardData = useBoard();
    const tools = useTools();
    const theme = useTheme();

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
            theme={theme}
        >
            <div onClick={handleClick} ref={boardRef}>
                {boardData.elements.map((element) => renderElement(element))}
            </div>
        </Container>
    );
};

export default Board;
