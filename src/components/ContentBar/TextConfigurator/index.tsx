import React, { useState } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';

import TextEditor from '../../Form/TextEditor';

import { ElementText } from '../../../data/board';

interface TextConfiguratorProps {
    data: ElementText;
}

const TextConfigurator: React.FC<TextConfiguratorProps> = ({ data }) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(convertFromRaw(data.rawContent))
    );

    return (
        <div>
            <TextEditor editorState={editorState} setEditorState={setEditorState} />
        </div>
    );
};

export default TextConfigurator;
