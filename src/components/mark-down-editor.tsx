"use client";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  imagePlugin,
  InsertCodeBlock,
  InsertTable,
  ListsToggle,
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
import { useTranslations } from "next-intl";
import api from "@/service/api";
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
          rows={props.code.split("\n").length}
          className="rounded-md min-w-full max-w-full resize-none"
          defaultValue={props.code}
          onChange={(e) => cb.setCode(e.target.value)}
        />
      </div>
    );
  },
};

const Editor = () => {
  const t = useTranslations();

  const imageUploadHandler = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await api.post("/uploads/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.url;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  return (
    <MDXEditor
      className="bg-default-100 rounded-md ring-1 ring-default-200 w-full overflow-hidden"
      contentEditableClassName="editor-content prose !w-full !max-w-full"
      translation={(key, _, interpolations) => {
        return t(key, interpolations);
      }}
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
        diffSourcePlugin(),
        toolbarPlugin({
          toolbarClassName: "editor-header sticky top-0 z-10 !bg-default-200 !*:text-neutral-50 ",
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              
              <Separator />

              <UndoRedo />
              
              <Separator />

              <ListsToggle />

              <Separator />

              <CodeToggle />
              <InsertCodeBlock />
              <CreateLink />
              <InsertTable />
              
              <Separator />

              <DiffSourceToggleWrapper options={["rich-text", "source"]}>
                <></>
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
    />
  );
};

export default Editor;
