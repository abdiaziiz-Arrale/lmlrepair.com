import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import { Post } from '@/lib/type';

interface CustomEditorPostProps {
  post: Post | null;
  handleInstance: (instance: EditorJS) => void;
}

const CustomEditorPost: React.FC<CustomEditorPostProps> = ({ post, handleInstance }) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const initializeEditor = async () => {
      const { default: EditorJS } = await import('@editorjs/editorjs');
      const { default: Header } = await import('@editorjs/header');
      const { default: Embed } = await import('@editorjs/embed');
      const { default: List } = await import('@editorjs/list');
      const { default: Code } = await import('@editorjs/code');
      const { default: LinkTool } = await import('@editorjs/link');
      const { default: InlineCode } = await import('@editorjs/inline-code');
      const { default: Quote } = await import('@editorjs/quote');
      const { default: CheckList } = await import('@editorjs/checklist');

      editorRef.current = new EditorJS({
        holder: 'editor',
        placeholder: 'Write your post content here...',
        data: post?.content ? JSON.parse(post.content) : {},
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4, 5, 6],
              defaultLevel: 2,
            },
          },
          list: List,
          checkList: CheckList,
          embed: Embed,
          linkTool: LinkTool,
          inlineCode: InlineCode,
          quote: Quote,
          code: Code,
        },
        onReady: () => {
          handleInstance(editorRef.current!);
        },
      });
    };

    initializeEditor();

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [post, handleInstance]);

  return <div id="editor" className="mt-4"></div>;
};

export default CustomEditorPost;
