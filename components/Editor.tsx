import React, { useEffect } from 'react';
import EditorJs from 'react-editor-js';
import CheckList from '@editorjs/checklist';
import CodeBox from '@bomdi/codebox';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';
import Header from '@editorjs/header';
import { OutputData } from '@editorjs/editorjs';

interface CustomEditorProps {
  data?: OutputData;
  handleInstance: (instance: any) => void;
}

const CustomEditor: React.FC<CustomEditorProps> = ({ data, handleInstance }) => {
  useEffect(() => {
    // Check if running in the client-side environment
    if (typeof window !== 'undefined') {
      // Import browser-specific modules here or perform client-side actions
    }
  }, []);

  const EDITOR_JS_TOOLS = {
    embed: Embed,
    header: Header,
    list: List,
    codeBox: CodeBox,
    linkTool: LinkTool,
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
      inlineCode: InlineCode,
            simpleImage: SimpleImage,

 image: {
            class: Image,
            config: {
                uploader: {
                  
                }
            }
        },
  };

  return (
    <EditorJs
      instanceRef={(instance) => handleInstance(instance)}
      tools={EDITOR_JS_TOOLS}
      data={data}
      placeholder="Write from here..."
    />
  );
};

export default CustomEditor;
