import React, { useState } from 'react';
import { MdFunctions, MdPanTool, MdTitle, MdInsertPhoto, MdAdd, MdChevronLeft } from 'react-icons/md';
import { GiArrowCursor, GiStoneSphere, GiResize, GiMove } from 'react-icons/gi';
import { BsGraphDown } from 'react-icons/bs';
import { useTransition } from 'react-spring';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Store } from '../../redux/reducers/types';

import { useTheme } from '../../contexts/theme';

import { ToolBarButton } from '../../styles/toolbar';
import { Container, Animation } from './styles';
import { toolBarData, ToolBarObjectItem } from '../../data/tools';

const ToolBar: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation('tools');
    const dispatch = useDispatch();

    const activeTool = useSelector((state: Store) => state.tools.tool);

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
            dispatch({ type: 'CHANGE_MODAL', id: 'addText', visible: true });
        } else if (button.tool === 'add-image') {
            dispatch({ type: 'CHANGE_MODAL', id: 'addImage', visible: true });
        } else if (button.tool === 'add-math') {
            dispatch({ type: 'CHANGE_MODAL', id: 'addLaTeX', visible: true });
        } else if (button.tool === 'set-cursor') {
            dispatch({ type: 'SET_CURRENT_TOOL', tool: 'cursor' });
        } else if (button.tool === 'set-drag') {
            dispatch({ type: 'SET_CURRENT_TOOL', tool: 'drag' });
        } else if (button.tool === 'set-resize') {
            dispatch({ type: 'SET_CURRENT_TOOL', tool: 'resize' });
        } else if (button.tool === 'set-pan') {
            dispatch({ type: 'SET_CURRENT_TOOL', tool: 'pan' });
        } else if (button.tool === 'add-plot') {
            dispatch({
                type: 'SET_ELEMENT_TO_ADD',
                element: {
                    id: Date.now(),
                    width: 300,
                    height: 300,
                    left: 0,
                    top: 0,
                    type: 'plot',
                    items: [],
                    translation: { x: -2.5, y: -2.5 },
                    zoom: { x: 100, y: 100 }
                }
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
                            current={activeTool === button.id}
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
