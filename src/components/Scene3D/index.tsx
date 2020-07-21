import React, { useState, useEffect } from 'react';

import { useSizeMonitor } from '../../contexts/sizeMonitor';

import CubeDrawner from './cube';

const Scene3D: React.FC = () => {
    const canvasRef = React.createRef<HTMLCanvasElement>();
    const { width, height } = useSizeMonitor();

    const [draw, setDraw] = useState<CubeDrawner | null>(null);

    const rand = Math.random().toString(36).substr(2, 9);
    const id = `_${rand}`;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        setDraw(new CubeDrawner(canvas));
    }, [canvasRef.current]);

    useEffect(() => {
        if (draw) {
            draw.beginRender();
        }
    }, [draw]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !draw) {
            return;
        }
        draw.updateViewport(canvas);
    }, [width, height]);

    return (
        <canvas id={id} ref={canvasRef} width={width} height={height} />
    );
};

export default Scene3D;
