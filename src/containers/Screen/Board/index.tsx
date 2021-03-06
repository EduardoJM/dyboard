import React, { createRef, useEffect, useState, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ipcRenderer } from 'electron';

import { Store } from '../../../redux/reducers/types';

import board from '../../../lib/board';

import { useTheme } from '../../../contexts/theme';
// import { LoaderHelperElement, parseToElements, elementsToString } from '../../../lib/board';

import actions from '../../../redux/actions';

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

    const [needSave, setNeedSave] = useState(false);
    const [savePath, setSavePath] = useState('');

    useEffect(() => {
        ipcRenderer.on('request-save', (event, arg: { path: string; }) => {
            setSavePath(arg.path);
            setNeedSave(true);
        });
        ipcRenderer.on('loaded', (event, arg: { path: string; data: Record<string, unknown> }) => {
            board.parse(arg.data).then((result) => {
                if (!result) {
                    // TODO: show a better error message here.
                    console.log('We have an error parsing the file.');
                    return;
                }
                dispatch(actions.board.setBoardItems(result));
            });
        });
    }, []);

    useEffect(() => {
        if (!needSave) {
            return;
        }
        ipcRenderer.send('save', {
            data: board.stringify(boardItems),
            path: savePath
        });
        setSavePath('');
        setNeedSave(false);
    }, [needSave]);

    function handleClick(e: MouseEvent) {
        if (tools.elementToAdd && boardRef.current) {
            const { pageX, pageY } = e;
            const rc = boardRef.current.getBoundingClientRect();
            const x = pageX - rc.left - translateX;
            const y = pageY - rc.top - translateY;
            dispatch(actions.board.addBoardItem({
                ...tools.elementToAdd,
                left: x,
                top: y
            }));
            dispatch(actions.tools.setElementToAdd(null));
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
