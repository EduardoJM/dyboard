import React from 'react';
import { MdBuild } from 'react-icons/md';

import { useTools } from '../../contexts/tools';

import Container from './styles';

const StatusBar: React.FC = () => {
    const tools = useTools();

    const getToolString = () => {
        if (tools.currentTool === 'cursor') return 'Cursor';
        if (tools.currentTool === 'drag') return 'Mover';
        if (tools.currentTool === 'resize') return 'Redimensionar';
        return '';
    };

    return (
        <Container>
            <span className="iconed">
                <MdBuild size={16} />
                {getToolString()}
            </span>
        </Container>
    );
};

export default StatusBar;
