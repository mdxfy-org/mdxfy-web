"use client";
import { BlockTypeSelect, BoldItalicUnderlineToggles, ChangeAdmonitionType, ChangeCodeMirrorLanguage, CodeToggle, CreateLink, diffSourcePlugin, DiffSourceToggleWrapper, toolbarPlugin, UndoRedo, type CodeBlockEditorDescriptor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import React from "react";
const {
  MDXEditor,
  codeBlockPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  useCodeBlockEditorContext,
} = await import("@mdxeditor/editor");

const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
  match: () => true,
  priority: 0,
  Editor: (props) => {
    const cb = useCodeBlockEditorContext();
    return (
      <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <textarea
          rows={3}
          cols={20}
          defaultValue={props.code}
          onChange={(e) => cb.setCode(e.target.value)}
        />
      </div>
    );
  },
};

const Editor = () => {
  return (
    <MDXEditor
    className="w-full h-full"
      markdown={"Hello world!"}
      plugins={[
        codeBlockPlugin({
          codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor],
        }),
        toolbarPlugin({
          toolbarClassName: 'my-classname',
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <UndoRedo />
              {/* <ChangeCodeMirrorLanguage /> */}
              <CodeToggle />
              <CreateLink />
              {/* <DiffSourceToggleWrapper /> */}
            </>
          )
        }),
        // diffSourcePlugin(),
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
};

export default Editor;
