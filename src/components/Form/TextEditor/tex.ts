import {
    AtomicBlockUtils,
    EditorState,
    Modifier,
    ContentBlock,
    CompositeDecorator,
    SelectionState
} from 'draft-js';
import InlineTeX from './InlineTeX';

// eslint-disable-next-line no-useless-escape
const INLINE_TEX_REGEX = /\\\([\s\S]+?\\\)|\$[\s\S]+?\$/g;

function findWithRegex(
    regex: RegExp,
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void
) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

function inlineTeXStrategy(
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void
) {
    findWithRegex(INLINE_TEX_REGEX, contentBlock, callback);
}

const compositeDecorator = new CompositeDecorator([
    {
        strategy: inlineTeXStrategy,
        component: InlineTeX
    }
]);

export function setInlineDecorator(editorState: EditorState): EditorState {
    return EditorState.set(editorState, {
        decorator: compositeDecorator
    });
}

export function insertTeXBlock(editorState: EditorState, tex: string): EditorState {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
        'TOKEN',
        'IMMUTABLE',
        { content: tex }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity }
    );
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}

export function removeTeXBlock(editorState: EditorState, blockKey: string): EditorState {
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(blockKey);

    const targetRange = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: block.getLength()
    });

    const withoutTeX = Modifier.removeRange(content, targetRange, 'backward');
    const resetBlock = Modifier.setBlockType(
        withoutTeX,
        withoutTeX.getSelectionAfter(),
        'unstyled'
    );

    const newState = EditorState.push(editorState, resetBlock, 'remove-range');
    return EditorState.forceSelection(newState, resetBlock.getSelectionAfter());
}
