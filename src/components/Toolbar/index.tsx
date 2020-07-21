import React, { useState } from 'react';
import { MdTitle, MdInsertPhoto, MdAdd, MdChevronLeft } from 'react-icons/md';
import { GiArrowCursor, GiCube } from 'react-icons/gi';

import { useTools } from '../../contexts/tools';

import { Container, Button } from './styles';
import toolBarData, { ToolBarObjectItem } from './data';

const Toolbar: React.FC = () => {
    const tools = useTools();

    const [barButtons, setBarButtons] = useState<ToolBarObjectItem[]>(toolBarData);
    const [parents, setParents] = useState<ToolBarObjectItem[][]>([]);

    const renderIcon = (id: string) => {
        if (id === 'cursor') {
            return <GiArrowCursor size={24} />;
        } else if (id === 'add') {
            return <MdAdd size={24} />;
        } else if (id === 'add-text') {
            return <MdTitle size={24} />;
        } else if (id === 'add-image') {
            return <MdInsertPhoto size={24} />;
        } else if (id === 'parent') {
            return <MdChevronLeft size={24} />;
        } else if (id === '3d-element' || id === 'cube') {
            return <GiCube size={24} />;
        }
        return <></>;
    };

    function handleButtonClick(button: ToolBarObjectItem) {
        if (button.tool === 'child') {
            if (button.childs) {
                setParents([
                    ...parents,
                    barButtons
                ]);
                setBarButtons(button.childs);
            }
        } else if (button.tool === 'parent') {
            if (parents.length > 0) {
                const buttons = parents[parents.length - 1];
                const array = parents.slice(0, parents.length - 1);
                setParents(array);
                setBarButtons(buttons);
            }
        } else if (button.tool === 'add-text') {
            tools.addText();
        } else if (button.tool === 'add-image') {
            tools.addImage();
        }
    }

    return (
        <Container>
            {barButtons.map((button) => (
                <Button
                    title={button.title}
                    key={button.id}
                    onClick={() => handleButtonClick(button)}
                >
                    {renderIcon(button.id)}
                </Button>
            ))}
        </Container>
    );
};

export default Toolbar;
