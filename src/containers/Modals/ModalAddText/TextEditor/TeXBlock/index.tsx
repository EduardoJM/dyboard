import React, { useState, createRef, ChangeEvent } from 'react';
import { ContentState, ContentBlock } from 'draft-js';
import katex from 'katex';
import { useTransition } from 'react-spring';

import { useTheme } from '../../../../../contexts/theme';

import KatexOutput from './KatexOutput';
import { EditPanel } from './styles';

interface TeXBlockProps {
    contentState: ContentState;
    block: ContentBlock;
    blockProps: {
        onRemove: (key: string) => void;
        onFinishEdit: (key: string, contentState: ContentState) => void;
        onStartEdit: (key: string) => void;
    }
};

const TeXBlock: React.FC<TeXBlockProps> = ({
    contentState,
    block,
    blockProps
}) => {
    const [editMode, setEditMode] = useState(false);
    const [invalidTeX, setInvalidTeX] = useState(false);
    const [texValue, setTexValue] = useState('');
    const theme = useTheme();
    const editPanelTransitions = useTransition(editMode, null, {
        from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' }
    });

    const getValue = (): string => {
        return contentState
            .getEntity(block.getEntityAt(0))
            .getData().content;
    };

    const handleKatexClick = () => {
        if (editMode) {
            return;
        }
        setEditMode(true);
        setTexValue(getValue());
        blockProps.onStartEdit(block.getKey());
    };

    const handleValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        let invalid = false;
        try {
            // katex.__parse(value);
            katex.renderToString(value);
        } catch (e) {
            invalid = true;
        } finally {
            setInvalidTeX(invalid);
            setTexValue(value);
        }
    };

    const handleRemove = () => {
        blockProps.onRemove(block.getKey());
    };

    const handleSave = () => {
        const entityKey = block.getEntityAt(0);
        const newContentState = contentState.mergeEntityData(
            entityKey,
            { content: texValue }
        );
        setInvalidTeX(false);
        setEditMode(false);
        setTexValue('');
        blockProps.onFinishEdit(block.getKey(), newContentState);
    };

    const textAreaRef = createRef<HTMLTextAreaElement>();

    let texContent = null;
    if (editMode) {
        if (invalidTeX) {
            texContent = '';
        } else {
            texContent = texValue;
        }
    } else {
        texContent = getValue();
    }
    let className = 'TeXEditor-tex';
    if (editMode) {
        className = `${className} TeXEditor-activeTeX`;
    }
    let buttonClass = 'TeXEditor-saveButton';
    if (editMode && invalidTeX) {
        buttonClass = `${buttonClass} TeXEditor-invalidButton`;
    }
    return (
        <div className={className}>
            <KatexOutput content={texContent} onClick={handleKatexClick} />
            {editPanelTransitions.map(
                ({ item, key, props: style }) => item && (
                    <EditPanel
                        key={key}
                        style={style}
                        theme={theme}
                    >
                        <textarea
                            onChange={handleValueChange}
                            ref={textAreaRef}
                            value={texValue}
                        />
                        <div className="buttons">
                            <button
                                className={buttonClass}
                                disabled={invalidTeX}
                                onClick={handleSave}>
                                {invalidTeX ? 'TeX Invalido' : 'Pronto'}
                            </button>
                            <button className="TeXEditor-removeButton" onClick={handleRemove}>
                                Remover
                            </button>
                        </div>
                    </EditPanel>
                )
            )}
        </div>
    );
};

export default TeXBlock;
