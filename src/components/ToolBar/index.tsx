import React, { useState } from 'react';
import { MdFunctions, MdPanTool, MdTitle, MdInsertPhoto, MdAdd, MdChevronLeft } from 'react-icons/md';
import { GiArrowCursor, GiCube, GiStoneSphere, GiResize, GiMove } from 'react-icons/gi';
import { BsGraphDown } from 'react-icons/bs';
import { useTransition } from 'react-spring';
import { useTranslation } from 'react-i18next';

import { useTools } from '../../contexts/tools';
import { useTheme } from '../../contexts/theme';

import { ToolBarButton } from '../../styles/toolbar';
import { Container, Animation } from './styles';
import toolBarData, { ToolBarObjectItem } from './data';

const ToolBar: React.FC = () => {
    const tools = useTools();
    const theme = useTheme();
    const { t } = useTranslation('tools');

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
        } else if (id === 'pan') {
            return <MdPanTool size={24} />;
        } else if (id === 'add-image') {
            return <MdInsertPhoto size={24} />;
        } else if (id === 'parent') {
            return <MdChevronLeft size={24} />;
        } else if (id === '3d-element' || id === 'cube') {
            return <GiCube size={24} />;
        } else if (id === 'sphere') {
            return <GiStoneSphere size={24} />;
        } else if (id === 'math') {
            return <MdFunctions size={24} />;
        } else if (id === 'drag') {
            return <GiMove size={24} />;
        } else if (id === 'resize') {
            return <GiResize size={24} />;
        } else if (id === 'plot') {
            return <BsGraphDown size={24} />;
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
        } else if (button.tool === 'add-math') {
            tools.addLatex();
        } else if (button.tool === 'set-cursor') {
            tools.changeCurrentTool('cursor');
        } else if (button.tool === 'set-drag') {
            tools.changeCurrentTool('drag');
        } else if (button.tool === 'set-resize') {
            tools.changeCurrentTool('resize');
        } else if (button.tool === 'set-pan') {
            tools.changeCurrentTool('pan');
        } else if (button.tool === 'add-plot') {
            tools.setCatchClick({
                id: Date.now(),
                width: 300,
                height: 300,
                left: 0,
                top: 0,
                type: 'plot',
                items: [],
                translation: { x: -2.5, y: -2.5 },
                zoom: { x: 100, y: 100 }
            });
        } else if (button.tool === 'add-3dspace') {
            tools.setCatchClick({
                id: Date.now(),
                width: 300,
                height: 300,
                left: 0,
                top: 0,
                type: '3d-space'
            });
        }
    }

    return (
        <Container theme={theme}>
            {transitions.map(({ item, key, props }) => (
                <Animation style={props} key={key}>
                    {toolBarData[item].map((button) => (
                        <ToolBarButton
                            title={t(`toolBar.titles.${button.id}`)}
                            key={button.id}
                            theme={theme}
                            current={tools.currentTool === button.id}
                            onClick={() => handleButtonClick(button)}
                        >
                            {renderIcon(button.id)}
                            {button.deep && (
                                <span className="deep" />
                            )}
                        </ToolBarButton>
                    ))}
                </Animation>
            ))}
        </Container>
    );
};

export default ToolBar;
