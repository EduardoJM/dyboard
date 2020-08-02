import React from 'react';
import { MdBuild } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import { useTools } from '../../contexts/tools';
import { useTheme } from '../../contexts/theme';

import Container from './styles';

const StatusBar: React.FC = () => {
    const tools = useTools();
    const theme = useTheme();
    const { t } = useTranslation('tools');

    const getToolString = () => {
        let key = 'to-add';
        if (!tools.elementToAdd) {
            key = tools.currentTool;
        }
        return t(`statusBar.${key}`);
    };

    return (
        <Container theme={theme}>
            <span className="iconed">
                <MdBuild size={16} />
                {getToolString()}
            </span>
        </Container>
    );
};

export default StatusBar;
