import React, { useState } from 'react';
import {
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import {
  RichTextPlugin,
} from '@lexical/react/LexicalRichTextPlugin';
import {
  ContentEditable,
} from '@lexical/react/LexicalContentEditable';
import {
  HistoryPlugin,
} from '@lexical/react/LexicalHistoryPlugin';
import {
  OnChangePlugin,
} from '@lexical/react/LexicalOnChangePlugin';
import {
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $getSelection,
  $isRangeSelection,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  HeadingNode,
  $createHeadingNode,
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';

// Theme with custom styles
const theme = {
  text: {
    underline: 'underline',
    bold: 'font-bold',
    italic: 'italic',
  },
  heading: {
    h1: 'text-[40px] font-bold',
    h2: 'text-[32px] font-semibold',
    h3: 'text-[28px] font-semibold',
    h4: 'text-[24px] font-medium',
    h5: 'text-[20px] font-medium',
    h6: 'text-[16px] font-medium',
  },
};

// Inline toolbar for text formatting
function InlineToolbar() {
  const [editor] = useLexicalComposerContext();
  const [heading, setHeading] = useState('');

  const toggleFormat = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const changeHeading = (event) => {
    const level = event.target.value;
    setHeading(level);

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(`h${level}`));
      }
    });
  };

  const handleUndo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const handleRedo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-300 bg-gray-100 text-sm rounded-t-lg">
      <button onClick={handleUndo} className="px-2 py-1 hover:bg-gray-200 rounded" aria-label="Undo" type="button">
        ⎌ Undo
      </button>
      <button onClick={handleRedo} className="px-2 py-1 hover:bg-gray-200 rounded" aria-label="Redo" type="button">
        ↻ Redo
      </button>

      <button onClick={() => toggleFormat('bold')} className="px-2 py-1 font-bold hover:bg-gray-200 rounded" aria-label="Bold" type="button">
        B
      </button>
      <button onClick={() => toggleFormat('italic')} className="px-2 py-1 italic hover:bg-gray-200 rounded" aria-label="Italic" type="button">
        I
      </button>
      <button onClick={() => toggleFormat('underline')} className="px-2 py-1 underline hover:bg-gray-200 rounded" aria-label="Underline" type="button">
        U
      </button>

      <select onChange={changeHeading} value={heading} className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded" aria-label="Select Heading">
        <option value="">Normal</option>
        <option value="1">Heading1</option>
        <option value="2">Heading2</option>
        <option value="3">Heading3</option>
        <option value="4">Heading4</option>
        <option value="5">Heading5</option>
        <option value="6">Heading6</option>
      </select>
    </div>
  );
}

// Main editor component
const LexicalEditor = ({ input, setInput }) => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError(error) {
      console.error('Lexical Error:', error);
    },
    editorState: null,
    nodes: [HeadingNode], // ✅ Important for heading support
  };

  const onChange = () => {
    const editorElement = document.querySelector('[contenteditable="true"]');
    if (editorElement) {
      const html = editorElement.innerHTML;
      setInput({ ...input, description: html });
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative border border-gray-300 rounded-lg overflow-hidden">
        <InlineToolbar />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[150px] p-3 text-base outline-none" />
            }
            placeholder={
              <div className="absolute top-0 left-0 text-gray-500 p-3 pointer-events-none">
                Enter description...
              </div>
            }
          />
        </div>
      </div>

      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
};

export default LexicalEditor;