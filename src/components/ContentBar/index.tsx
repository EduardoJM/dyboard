import React, { useState } from 'react';
import { useTransition } from 'react-spring';
import { RiListSettingsLine } from 'react-icons/ri';
import { MdDelete, MdList } from 'react-icons/md';

import { Container, Content, Bar } from './styles';

import PlotConfigurator from './PlotConfigurator';
import TextConfigurator from './TextConfigurator';
import BoardPanel from './BoardPanel';

import { ElementPlot, ElementText } from '../../data/board';

import { ToolBarButton } from '../../styles/toolbar';

import { useTheme } from '../../contexts/theme';
import { useBoard } from '../../contexts/board';
import { useTools } from '../../contexts/tools';

const ContentBar: React.FC = () => {
    const [contentVisible, setContentVisible] = useState(true);
    const [contentIsBoardItems, setContentIsBoardItems] = useState(false);
    const theme = useTheme();
    const tools = useTools();
    const board = useBoard();
    const contentTransition = useTransition(contentVisible, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    function renderContent(): JSX.Element | null {
        if (contentIsBoardItems) {
            return <BoardPanel />;
        }
        if (tools.currentElement === null) {
            return null;
        } else if (tools.currentElement.type === 'plot') {
            return <PlotConfigurator data={tools.currentElement as ElementPlot} />;
        } else if (tools.currentElement.type === 'text') {
            return <TextConfigurator data={tools.currentElement as ElementText} />;
        }
        return null;
    }

    function handleDeleteClick() {
        if (!tools.currentElement) {
            return;
        }
        const idx = board.elements.indexOf(tools.currentElement);
        const newElements = [
            ...board.elements.slice(0, idx),
            ...board.elements.slice(idx + 1)
        ];
        board.changeElements(newElements);
        tools.setCurrentElement(null);
    }

    function handleContentButtonClick() {
        if (contentVisible && !contentIsBoardItems) {
            setContentVisible(false);
        } else if (contentVisible && contentIsBoardItems) {
            setContentIsBoardItems(false);
        } else if (!contentVisible) {
            setContentVisible(true);
            setContentIsBoardItems(false);
        }
    }

    function handleBoardButtonClick() {
        if (contentVisible && contentIsBoardItems) {
            setContentVisible(false);
            setContentIsBoardItems(false);
        } else if (contentVisible && !contentIsBoardItems) {
            setContentIsBoardItems(true);
        } else if (!contentVisible) {
            setContentVisible(true);
            setContentIsBoardItems(true);
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
                    title="Exibir o Painel de Conteúdo"
                    theme={theme}
                    markerSide="right"
                    current={contentVisible && !contentIsBoardItems}
                    onClick={handleContentButtonClick}
                >
                    <RiListSettingsLine size={24} />
                </ToolBarButton>
                {tools.currentElement && (
                    <ToolBarButton
                        title="Deletar Conteúdo Selecionado"
                        theme={theme}
                        markerSide="right"
                        current={false}
                        onClick={handleDeleteClick}
                    >
                        <MdDelete size={24} />
                    </ToolBarButton>
                )}
                <div style={{ flex: 1 }}></div>
                <ToolBarButton
                    title="Exibir os Conteúdos"
                    theme={theme}
                    markerSide="right"
                    current={contentVisible && contentIsBoardItems}
                    onClick={handleBoardButtonClick}
                >
                    <MdList size={24} />
                </ToolBarButton>
            </Bar>
        </Container>
    );
};

export default ContentBar;
