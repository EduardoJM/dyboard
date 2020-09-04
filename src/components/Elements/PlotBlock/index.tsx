import React, { useEffect, MouseEvent, WheelEvent, createRef } from 'react';
import { View } from 'jplot';
import { evaluate } from 'mathjs';
import { useSelector, useDispatch } from 'react-redux';

import { Store } from '../../../redux/reducers/types';

import actions from '../../../redux/actions';

import Container from './styles';

import { ElementPlot } from '../../../data/board';

import ElementContainer from '../ElementContainer';

interface PlotBlockProps {
    data: ElementPlot;
}

const PlotBlock: React.FC<PlotBlockProps> = ({ data }) => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const dispatch = useDispatch();
    const state = useSelector((state: Store) => state);

    let view: View | null = null;

    useEffect(() => {
        if (!canvasRef) {
            return;
        }
        if (!canvasRef.current) {
            return;
        }
        const rc = canvasRef.current.getBoundingClientRect();
        canvasRef.current.width = rc.width;
        canvasRef.current.height = rc.height;
        view = new View(canvasRef.current);
        view.evaluate = (expr, x) => evaluate(expr, { x });
        data.items.forEach((item) => {
            if (!view) {
                return;
            }
            view.items.push(item);
        });

        view.zoom = data.zoom;
        view.translation = data.translation;

        view.render();
    }, [canvasRef]);

    function handleMouseDown(e: MouseEvent) {
        if (!canvasRef.current || state.tools.tool !== 'cursor') {
            return;
        }
        const rc = canvasRef.current.getBoundingClientRect();
        let startX = e.pageX - rc.left;
        let startY = e.pageY - rc.top;
        const mouseMove = (evt: globalThis.MouseEvent) => {
            if (!view) {
                return;
            }
            const px = evt.pageX - rc.left;
            const py = evt.pageY - rc.top;
            const dx = px - startX;
            const dy = py - startY;
            startX = px;
            startY = py;
            view.translation = {
                x: view.translation.x - dx / view.zoom.x,
                y: view.translation.y - dy / view.zoom.y
            };
            view.render();
        };
        const mouseUp = () => {
            if (!view) {
                return;
            }
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            const newItem = {
                ...data,
                zoom: view.zoom,
                translation: view.translation
            };
            dispatch(actions.board.updateBoardItem(data, newItem));
        };
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    let scrollTimeout: number | undefined;

    function handleWheel(e: WheelEvent) {
        if (!canvasRef.current || !view) {
            return;
        }
        const delta = (e.deltaY / Math.abs(e.deltaY)) * 5;
        const zoomX = Math.max(1, Math.min(1000, view.zoom.x - delta));
        const zoomY = Math.max(1, Math.min(1000, view.zoom.y - delta));
        if (zoomX === view.zoom.x && zoomY === view.zoom.y) {
            return;
        }
        // this translation is to zoom with the center in focus
        const w = view.canvas.width / view.zoom.x;
        const h = view.canvas.height / view.zoom.y;
        const nw = view.canvas.width / zoomX;
        const nh = view.canvas.height / zoomY;
        view.translation = {
            x: view.translation.x - ((nw - w) / 2),
            y: view.translation.y - ((nh - h) / 2)
        };
        view.zoom = {
            x: zoomX,
            y: zoomY
        };
        view.render();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!view) {
                return;
            }
            const newItem = {
                ...data,
                zoom: view.zoom,
                translation: view.translation
            };
            dispatch(actions.board.updateBoardItem(data, newItem));
        }, 400);
    }

    return (
        <ElementContainer data={data}>
            <Container
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onWheel={handleWheel}
            />
        </ElementContainer>
    );
};

export default PlotBlock;
