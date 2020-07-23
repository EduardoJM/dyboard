import React from 'react';
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined } from 'react-icons/md';
import { Editor, EditorState, RichUtils } from 'draft-js';

import Button from '../Button';

import 'draft-js/dist/Draft.css';

const TextEditor: React.FC = () => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty()
    );

    const toggleInlineStyle = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    return (
        <>
            <div>
                <Button onClick={() => toggleInlineStyle('BOLD')}>
                    <MdFormatBold size={16} />
                </Button>
                <Button onClick={() => toggleInlineStyle('ITALIC')}>
                    <MdFormatItalic size={16} />
                </Button>
                <Button onClick={() => toggleInlineStyle('UNDERLINE')}>
                    <MdFormatUnderlined size={16} />
                </Button>
            </div>
            <Editor
                editorState={editorState}
                onChange={setEditorState}
            />
        </>
    );
};

export default TextEditor;
