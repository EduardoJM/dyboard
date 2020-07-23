import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import { Container, ToolBar } from './styles';

import { BlockTypes, InlineStyles } from '../../../data/textEditor';
import { useTheme } from '../../../contexts/theme';

import 'draft-js/dist/Draft.css';

interface TextEditorProps {
    editorState: EditorState;
    setEditorState: (newState: EditorState) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
    editorState,
    setEditorState
}) => {
    const theme = useTheme();

    const toggleInlineStyle = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const toggleBlockType = (style: string) => {
        setEditorState(RichUtils.toggleBlockType(editorState, style));
    };

    return (
        <Container>
            <div>
                <ToolBar theme={theme}>
                    {BlockTypes.map((item) => (
                        <button
                            type="button"
                            key={item.label}
                            onClick={() => toggleBlockType(item.style)}
                        >
                            { item.label }
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
                            { item.label }
                        </button>
                    ))}
                </ToolBar>
            </div>
            <Editor
                editorState={editorState}
                onChange={setEditorState}
            />
        </Container>
    );
};

export default TextEditor;
