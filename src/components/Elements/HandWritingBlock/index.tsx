import React, { useState, useRef, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ElementContainer from '../ElementContainer';

import { ElementHandWrite } from '../../../data/board';
import { Store } from '../../../redux/reducers/types';
import actions from '../../../redux/actions';

interface HandWritingBlockProps {
    data: ElementHandWrite;
}

const HandWritingBlock: React.FC<HandWritingBlockProps> = ({ data }) => {
    const dispatch = useDispatch();
    const state = useSelector((state: Store) => state);
    const ref = useRef<HTMLDivElement>(null);

    const [color, setColor] = useState('#FFF');
    const [width, setWidth] = useState(1);

    let path: {x: number; y: number; }[] = [];

    const [currentPath, setCurrentPath] = useState<{x: number; y: number; }[]>([]);

    const handleMouseMove = (e: globalThis.MouseEvent) => {
        if (!ref.current) {
            return;
        }
        const rc = ref.current.getBoundingClientRect();
        const point = {
            x: e.pageX - rc.left,
            y: e.pageY - rc.top
        };
        path.push(point);
        setCurrentPath((path) => [
            ...path,
            point
        ]);
    };

    const handleMouseUp = (e: globalThis.MouseEvent) => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        const newItem = {
            ...data,
            paths: [
                ...data.paths,
                {
                    id: Date.now().toString(),
                    points: path,
                    color,
                    width
                }
            ]
        };
        dispatch(actions.board.updateBoardItem(data, newItem));
        setCurrentPath([]);
        path = [];
    };

    const handleMouseDown = (e: MouseEvent) => {
        if (state.tools.tool !== 'cursor' || !ref.current) {
            return;
        }
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const renderPath = (data: { x: number; y: number}[]) => {
        return data.map((point, index) => {
            if (index === 0) {
                return `M ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
            } else {
                return `L ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
            }
        }).join(' ');
    };

    return (
        <ElementContainer data={data}>
            <div
                ref={ref}
                style={{ width: '100%', height: '100%' }}
                onMouseDown={handleMouseDown}
            >
                <svg
                    style={{
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none'
                    }}
                >
                    {data.paths.map((path) => (
                        <path
                            key={path.id}
                            d={renderPath(path.points)}
                            stroke={path.color}
                            strokeWidth={`${path.width}px`}
                            fill={'transparent'}
                        />
                    ))}
                    {currentPath.length > 0 && (
                        <path d={renderPath(currentPath)} stroke={color} strokeWidth={`${width}px`} fill={'transparent'} />
                    )}
                </svg>
            </div>
        </ElementContainer>
    );
};

export default HandWritingBlock;
