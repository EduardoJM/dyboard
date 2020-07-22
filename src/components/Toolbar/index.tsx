import React, { useState } from 'react';
import { MdTitle, MdInsertPhoto, MdAdd, MdChevronLeft } from 'react-icons/md';
import { GiArrowCursor, GiCube } from 'react-icons/gi';
import { useTransition } from 'react-spring';

import { useTools } from '../../contexts/tools';

import { Container, Button, Animation } from './styles';
import toolBarData, { ToolBarObjectItem } from './data';

const Toolbar: React.FC = () => {
    const tools = useTools();

    const [currentTools, setCurrentTools] = useState(0);

    const transitions = useTransition(currentTools, null, {
        from: { position: 'absolute', opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
    });

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
        if (button.tool === 'goto') {
            if (button.goToId !== null && button.goToId !== undefined) {
                setCurrentTools(button.goToId);
            }
        } else if (button.tool === 'add-text') {
            tools.addText();
        } else if (button.tool === 'add-image') {
            tools.addImage();
        }
    }

    return (
        <Container>
            {transitions.map(({ item, key, props }) => (
                <Animation style={props} key={key}>
                    {toolBarData[item].map((button) => (
                        <Button
                            title={button.title}
                            key={button.id}
                            onClick={() => handleButtonClick(button)}
                        >
                            {renderIcon(button.id)}
                            {button.deep && (
                                <span className="deep" />
                            )}
                        </Button>
                    ))}
                </Animation>
            ))}
        </Container>
    );
};

export default Toolbar;
