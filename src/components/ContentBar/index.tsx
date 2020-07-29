import React, { useState } from 'react';
import { useTransition } from 'react-spring';
import { RiListSettingsLine } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';

import { Container, Content, Bar } from './styles';

import PlotConfigurator from './PlotConfigurator';

import { ElementPlot } from '../../data/board';

import { ToolBarButton } from '../../styles/toolbar';

import { useTheme } from '../../contexts/theme';
import { useBoard } from '../../contexts/board';
import { useTools } from '../../contexts/tools';

const ContentBar: React.FC = () => {
    const [contentVisible, setContentVisible] = useState(true);
    const theme = useTheme();
    const tools = useTools();
    const board = useBoard();
    const contentTransition = useTransition(contentVisible, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    function renderContent(): JSX.Element | null {
        if (tools.currentElement === null) {
            return null;
        } else if (tools.currentElement.type === 'plot') {
            return <PlotConfigurator data={tools.currentElement as ElementPlot} />;
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
                    current={contentVisible}
                    onClick={() => setContentVisible(!contentVisible)}
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
            </Bar>
        </Container>
    );
};

export default ContentBar;
