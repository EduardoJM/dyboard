import React from 'react';
import { MdBuild } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Store } from '../../redux/reducers/types';

import { useTheme } from '../../contexts/theme';

import Container from './styles';

const StatusBar: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation('tools');
    const tools = useSelector((state: Store) => state.tools);

    const getToolString = () => {
        let key = 'to-add';
        if (!tools.elementToAdd) {
            key = tools.tool;
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
