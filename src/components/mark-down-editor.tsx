"use client";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  imagePlugin,
  InsertCodeBlock,
  InsertTable,
  ListsToggle,
  MDXEditorProps,
  SandpackConfig,
  sandpackPlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import React from "react";
import { useTranslations } from "next-intl";
import api from "@/service/api";
import {
  MDXEditor,
  codeBlockPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
} from "@mdxeditor/editor";

const defaultSnippetContent = "".trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

export interface EditorProps extends MDXEditorProps {
  readonly?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  markdown,
  onChange,
  readonly,
  ...props
}) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      translation={(key, _, interpolations) => t(key as any, interpolations)}
      markdown={markdown ?? ""}
      onChange={onChange}
      plugins={[
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          autoLoadLanguageSupport: true,
          codeBlockLanguages: {
            js: "JavaScript",
            jsx: "JavaScript XML",
            ts: "TypeScript",
            tsx: "TypeScript XML",
            css: "CSS",
            scss: "SCSS",
            less: "LESS",
            html: "HTML",
            php: "PHP",
            py: "Python",
            java: "Java",
            c: "C",
            cpp: "C++",
            csharp: "C#",
            go: "Go",
            ruby: "Ruby",
            swift: "Swift",
            kotlin: "Kotlin",
            rust: "Rust",
          },
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
        ...(!readonly
          ? [
              toolbarPlugin({
                toolbarClassName:
                  "editor-header sticky top-0 z-10 !bg-default-200 !*:text-neutral-50 ",
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
            ]
          : []),
      ]}
      readOnly={readonly}
      {...props}
    />
  );
};

export default Editor;
