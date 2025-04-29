"use client";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeAdmonitionType,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  imagePlugin,
  InsertTable,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  type CodeBlockEditorDescriptor,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import React from "react";
import defaultText from "./debug/mdx-editor-test";
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
  const imageUploadHandler = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await fetch("/uploads/new", {
      method: "POST",
      body: formData,
    });
    const json = (await response.json()) as { url: string };
    return json.url;
  };

  return (
    <MDXEditor
      className="rounded-md ring-1 ring-default-200 w-full overflow-hidden prose"
      markdown={defaultText}
      plugins={[
        codeBlockPlugin({
          codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor],
        }),
        tablePlugin(),
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        imagePlugin({ imageUploadHandler }),
        toolbarPlugin({
          toolbarClassName: "my-classname",
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <UndoRedo />
              <CodeToggle />
              <CreateLink />
              <InsertTable />
              <Separator />
            </>
          ),
        }),
      ]}
    />
  );
};

export default Editor;
