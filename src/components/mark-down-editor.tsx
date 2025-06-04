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
  MDXEditorMethods,
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
import { cn } from "@heroui/react";

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
  const ref = React.useRef<MDXEditorMethods>(null);

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
      ref={ref}
      className={cn(
        "bg-default-100/15 border-2 border-default-200 rounded-xl w-full overflow-hidden duration-200",
        readonly
          ? "editor-readonly"
          : "hover:border-default-400 focus-within:!border-default-600"
      )}
      contentEditableClassName="editor-content prose !w-full !max-w-full"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      translation={(key, _, interpolations) => t(key as any, interpolations)}
      markdown={markdown ?? ""}
      onChange={onChange}
      plugins={[
        codeBlockPlugin({ defaultCodeBlockLanguage: "javascript" }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          autoLoadLanguageSupport: true,
          codeBlockLanguages: {
            javascript: "JavaScript",
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
                  "editor-header sticky top-0 z-10 !bg-default-50 !*:text-neutral-50 ",
                toolbarContents: () => (
                  <>
                    {/* <ButtonGroup>
                      <Button size="sm" onPress={() => {}} isIconOnly>
                        <strong className="text-xl">B</strong>
                      </Button>
                      <Button size="sm" onPress={() => {}} isIconOnly>
                        <span className="font-mono text-xl italic translate-y-[1px]">
                          I
                        </span>
                      </Button>
                      <Button size="sm" onPress={() => {}} isIconOnly>
                        <span className="font-mono text-xl underline translate-y-[1px]">
                          U
                        </span>
                      </Button>
                    </ButtonGroup> */}
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

                    <DiffSourceToggleWrapper
                      options={["rich-text", "source"]}
                      SourceToolbar={""}
                    >
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
