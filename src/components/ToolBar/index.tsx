import React, { useState } from 'react';
import { MdFunctions, MdPanTool, MdTitle, MdInsertPhoto, MdAdd, MdChevronLeft, MdEdit } from 'react-icons/md';
import { GiArrowCursor, GiStoneSphere, GiResize, GiMove } from 'react-icons/gi';
import { BsGraphDown } from 'react-icons/bs';
import { useTransition } from 'react-spring';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Store } from '../../redux/reducers/types';
import actions from '../../redux/actions';

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
        } else if (id === 'hand-pen') {
            return <MdEdit size={24} />;
        }
        return <></>;
    };

    function handleButtonClick(button: ToolBarObjectItem) {
        if (button.tool === 'goto') {
            if (button.goToId !== null && button.goToId !== undefined) {
                setCurrentTools(button.goToId);
            }
        } else if (button.tool === 'add-text') {
            dispatch(actions.modals.changeModalState('addText', true));
        } else if (button.tool === 'add-image') {
            dispatch(actions.modals.changeModalState('addImage', true));
        } else if (button.tool === 'add-math') {
            dispatch(actions.modals.changeModalState('addLaTeX', true));
        } else if (button.tool === 'set-cursor') {
            dispatch(actions.tools.setCurrentTool('cursor'));
        } else if (button.tool === 'set-drag') {
            dispatch(actions.tools.setCurrentTool('drag'));
        } else if (button.tool === 'set-resize') {
            dispatch(actions.tools.setCurrentTool('resize'));
        } else if (button.tool === 'set-pan') {
            dispatch(actions.tools.setCurrentTool('pan'));
        } else if (button.tool === 'add-hand-pen') {
            dispatch(actions.tools.setElementToAdd({
                type: 'handwrite',
                id: Date.now().toString(10),
                width: 600,
                height: 600,
                left: 0,
                top: 0,
                data: {
                    paths: []
                }
            }));
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
