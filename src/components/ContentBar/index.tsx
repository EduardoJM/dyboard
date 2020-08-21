import React, { useState } from 'react';
import { useTransition } from 'react-spring';
import { RiListSettingsLine } from 'react-icons/ri';
import { MdDelete, MdList } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { Store } from '../../redux/reducers/types';

import { Container, Content, Bar } from './styles';

import PlotConfigurator from './PlotConfigurator';
import TextConfigurator from './TextConfigurator';
import BoardPanel from './BoardPanel';

import { ElementPlot, ElementText } from '../../data/board';

import { ToolBarButton } from '../../styles/toolbar';

import { useTheme } from '../../contexts/theme';

type ContentBarPanel = 'contentSetting' | 'boardItems';

const ContentBar: React.FC = () => {
    const [contentVisible, setContentVisible] = useState(true);
    const [currentPanel, setCurrentPanel] = useState<ContentBarPanel>('contentSetting');
    const contentTransition = useTransition(contentVisible, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });
    const { t } = useTranslation('contentBar');
    const theme = useTheme();
    const dispatch = useDispatch();

    const elements = useSelector((state: Store) => state.board.elements);
    const selectedElement = useSelector((state: Store) => state.board.currentElement);

    function renderContent(): JSX.Element | null {
        if (currentPanel === 'boardItems') {
            return <BoardPanel />;
        } else if (currentPanel === 'contentSetting') {
            if (selectedElement === null) {
                return null;
            } else if (selectedElement.type === 'plot') {
                return <PlotConfigurator data={selectedElement as ElementPlot} />;
            } else if (selectedElement.type === 'text') {
                return <TextConfigurator data={selectedElement as ElementText} />;
            }
        }
        return null;
    }

    function handleDeleteClick() {
        if (!selectedElement) {
            return;
        }
        const idx = elements.indexOf(selectedElement);
        const newElements = [
            ...elements.slice(0, idx),
            ...elements.slice(idx + 1)
        ];
        dispatch({ type: 'SET_BOARD_ITEMS', boardItemsCollection: newElements });
    }

    function handleContentButtonClick() {
        if (contentVisible) {
            if (currentPanel === 'contentSetting') {
                setContentVisible(false);
            } else {
                setCurrentPanel('contentSetting');
            }
        } else {
            setContentVisible(true);
            setCurrentPanel('contentSetting');
        }
    }

    function handleBoardButtonClick() {
        if (contentVisible) {
            if (currentPanel === 'boardItems') {
                setContentVisible(false);
            } else {
                setCurrentPanel('boardItems');
            }
        } else {
            setContentVisible(true);
            setCurrentPanel('boardItems');
        }
    }

    return (
        <Container>
            {contentTransition.map(({ item, key, props }) => item && (
                <Content theme={theme} style={props} key={key}>
                    {renderContent()}
                </Content>
            ))}
            <Bar theme={theme}>
                <ToolBarButton
                    title={t('content')}
                    theme={theme}
                    markerSide="right"
                    current={contentVisible && currentPanel === 'contentSetting'}
                    onClick={handleContentButtonClick}
                >
                    <RiListSettingsLine size={24} />
                </ToolBarButton>
                {selectedElement && (
                    <ToolBarButton
                        title={t('delete')}
                        theme={theme}
                        markerSide="right"
                        current={false}
                        onClick={handleDeleteClick}
                    >
                        <MdDelete size={24} />
                    </ToolBarButton>
                )}
                <ToolBarButton
                    title={t('contentList')}
                    theme={theme}
                    markerSide="right"
                    current={contentVisible && currentPanel === 'boardItems'}
                    onClick={handleBoardButtonClick}
                >
                    <MdList size={24} />
                </ToolBarButton>
            </Bar>
        </Container>
    );
};

export default ContentBar;
