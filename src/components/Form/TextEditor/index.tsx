import React, { useState, useEffect } from 'react';
import {
    Editor,
    EditorState,
    RichUtils,
    ContentState,
    ContentBlock
} from 'draft-js';
import { Map } from 'immutable';
import { useTranslation } from 'react-i18next';

import { Container, ToolBar } from './styles';

import { BlockTypes, InlineStyles } from '../../../data/textEditor';
import { useTheme } from '../../../contexts/theme';

import TeXBlock from './TeXBlock';
import { setInlineDecorator, insertTeXBlock, removeTeXBlock } from './tex';

import 'draft-js/dist/Draft.css';

interface TextEditorProps {
    editorState: EditorState;
    setEditorState: (newState: EditorState) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
    editorState,
    setEditorState
}) => {
    const [liveTeXEdits, setLiveTeXEdits] = useState(Map());
    const theme = useTheme();
    const { t } = useTranslation('components');

    useEffect(() => {
        setEditorState(setInlineDecorator(editorState));
    }, []);

    const toggleInlineStyle = (style: string) => {
        setEditorState(setInlineDecorator(RichUtils.toggleInlineStyle(editorState, style)));
    };

    const toggleBlockType = (style: string) => {
        setEditorState(setInlineDecorator(RichUtils.toggleBlockType(editorState, style)));
    };

    const inserTex = () => {
        setEditorState(setInlineDecorator(insertTeXBlock(editorState, 'ax^2+bx+c=0')));
        setLiveTeXEdits(Map());
    };

    const removeTex = (blockKey: string) => {
        setLiveTeXEdits(liveTeXEdits.remove(blockKey));
        setEditorState(setInlineDecorator(removeTeXBlock(editorState, blockKey)));
    };

    const handleBlockRenderer = (block: ContentBlock) => {
        if (block.getType() === 'atomic') {
            return {
                component: TeXBlock,
                editable: false,
                props: {
                    onStartEdit: (blockKey: string) => {
                        setLiveTeXEdits(liveTeXEdits.set(blockKey, true));
                    },
                    onFinishEdit: (blockKey: string, newContentState: ContentState) => {
                        setEditorState(setInlineDecorator(
                            EditorState.createWithContent(newContentState)
                        ));
                        setLiveTeXEdits(liveTeXEdits.remove(blockKey));
                    },
                    onRemove: (blockKey: string) => removeTex(blockKey)
                }
            };
        }
        return null;
    };

    return (
        <Container theme={theme}>
            <div className="toolbar-container">
                <ToolBar theme={theme}>
                    {BlockTypes.map((item) => (
                        <button
                            type="button"
                            key={item.label}
                            onClick={() => toggleBlockType(item.style)}
                        >
                            { t(item.label) }
                        </button>
                    ))}
                </ToolBar>
                <ToolBar theme={theme}>
                    {InlineStyles.map((item) => (
                        <button
                            type="button"
                            key={item.label}
                            onClick={() => toggleInlineStyle(item.style)}
                        >
                            { t(item.label) }
                        </button>
                    ))}
                    <button type="button" onClick={inserTex}>
                        {t('textEditor.tex')}
                    </button>
                </ToolBar>
            </div>
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                blockRendererFn={handleBlockRenderer}
                readOnly={liveTeXEdits.count() > 0}
                spellCheck={true}
            />
        </Container>
    );
};

export default TextEditor;
