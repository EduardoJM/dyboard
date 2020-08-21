import React, { createRef, useState, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Store } from '../../redux/reducers/types';

import { useTheme } from '../../contexts/theme';

import Container from './styles';
import renderElement from './renderer';

const Board: React.FC = () => {
    const boardRef = createRef<HTMLDivElement>();
    const boardTranslationRef = createRef<HTMLDivElement>();
    const theme = useTheme();
    const dispatch = useDispatch();

    const boardItems = useSelector((state: Store) => state.board.elements);
    const tools = useSelector((state: Store) => state.tools);

    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    function handleClick(e: MouseEvent) {
        if (tools.elementToAdd && boardRef.current) {
            const { pageX, pageY } = e;
            const rc = boardRef.current.getBoundingClientRect();
            const x = pageX - rc.left;
            const y = pageY - rc.top;
            dispatch({
                type: 'ADD_BOARD_ITEM',
                boardItem: {
                    ...tools.elementToAdd,
                    left: x,
                    top: y
                }
            });
            dispatch({
                type: 'SET_ELEMENT_TO_ADD',
                element: null
            });
        }
    }

    function handleMouseDown(e: MouseEvent) {
        if (!boardRef.current || tools.tool !== 'pan') {
            return;
        }
        const rc = boardRef.current.getBoundingClientRect();
        let startX = e.pageX - rc.left;
        let startY = e.pageY - rc.top;

        let tx = translateX;
        let ty = translateY;

        const mouseMove = (e: globalThis.MouseEvent) => {
            const x = e.pageX - rc.left;
            const y = e.pageY - rc.top;
            const dx = x - startX;
            const dy = y - startY;
            tx += dx;
            ty += dy;
            if (boardTranslationRef.current) {
                boardTranslationRef.current.style.left = `${tx}px`;
                boardTranslationRef.current.style.top = `${ty}px`;
            }
            startX = x;
            startY = y;
        };

        const mouseUp = () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            setTranslateX(tx);
            setTranslateY(ty);
        };

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    return (
        <Container
            ref={boardRef}
            onClick={handleClick}
            catching={tools.elementToAdd !== null}
            onMouseDown={handleMouseDown}
            theme={theme}
        >
            <div
                className="board-contents"
                ref={boardTranslationRef}
                style={{
                    position: 'absolute',
                    left: translateX,
                    top: translateY
                }}
            >
                {boardItems.map((element) => renderElement(element))}
            </div>
        </Container>
    );
};

export default Board;
