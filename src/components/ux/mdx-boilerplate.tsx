import React from "react";
import { LeafDirective } from "mdast-util-directive";
import {
  diffSourcePlugin,
  markdownShortcutPlugin,
  AdmonitionDirectiveDescriptor,
  DirectiveDescriptor,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  SandpackConfig,
  codeBlockPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  Separator,
  UndoRedo,
  ListsToggle,
  CodeToggle,
  InsertCodeBlock,
  CreateLink,
  InsertTable,
  DiffSourceToggleWrapper,
  ViewMode,
  InsertAdmonition,
  ConditionalContents,
  EditorInFocus,
  DirectiveNode,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  StrikeThroughSupSubToggles,
  ChangeAdmonitionType,
  InsertImage,
  InsertThematicBreak,
  InsertFrontmatter,
} from "@mdxeditor/editor";
import api, { apiBaseUrl } from "@/service/api";
import { codeMirrorConfig, simpleSandpackConfig } from "@/service/mdx";

// const defaultSnippetContent = `
// export default function App() {
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }
// `.trim();

export const virtuosoSampleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    // {
    //   label: "React",
    //   name: "react",
    //   meta: "live react",
    //   sandpackTemplate: "react",
    //   sandpackTheme: "light",
    //   snippetFileName: "/App.js",
    //   snippetLanguage: "jsx",
    //   initialSnippetContent: defaultSnippetContent,
    // },
    // {
    //   label: "React",
    //   name: "react",
    //   meta: "live",
    //   sandpackTemplate: "react",
    //   sandpackTheme: "light",
    //   snippetFileName: "/App.js",
    //   snippetLanguage: "jsx",
    //   initialSnippetContent: defaultSnippetContent,
    // },
    // {
    //   label: "Virtuoso",
    //   name: "virtuoso",
    //   meta: "live virtuoso",
    //   sandpackTemplate: "react-ts",
    //   sandpackTheme: "light",
    //   snippetFileName: "/App.tsx",
    //   initialSnippetContent: defaultSnippetContent,
    //   dependencies: {
    //     "react-virtuoso": "latest",
    //     "@ngneat/falso": "latest",
    //   },
    //   files: {
    //     // "/data.ts": dataCode,
    //   },
    // },
  ],
};

export async function expressImageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append("image", image);
  const response = await api.post("/uploads/attachments", formData, {
    baseURL: apiBaseUrl,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.url;
}

interface YoutubeDirectiveNode extends LeafDirective {
  name: "youtube";
  attributes: { id: string };
}

export const YoutubeDirectiveDescriptor: DirectiveDescriptor<YoutubeDirectiveNode> =
  {
    name: "youtube",
    type: "leafDirective",
    testNode(node) {
      return node.name === "youtube";
    },
    attributes: ["id"],
    hasChildren: false,
    Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <button
            onClick={() => {
              parentEditor.update(() => {
                lexicalNode.selectNext();
                lexicalNode.remove();
              });
            }}
          >
            delete
          </button>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${mdastNode.attributes.id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      );
    },
  };

function whenInAdmonition(editorInFocus: EditorInFocus | null) {
  const node = editorInFocus?.rootNode;
  if (!node || node.getType() !== "directive") {
    return false;
  }

  return ["note", "tip", "danger", "info", "caution"].includes(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (node as DirectiveNode).getMdastNode().name as any
  );
}

export const EditorTools: React.FC = () => {
  return (
    <ConditionalContents
      options={[
        {
          when: (editor) => editor?.editorType === "codeblock",
          contents: () => <ChangeCodeMirrorLanguage />,
        },
        {
          when: (editor) => editor?.editorType === "sandpack",
          contents: () => <ShowSandpackInfo />,
        },
        {
          fallback: () => (
            <>
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />

              <ConditionalContents
                options={[
                  {
                    when: whenInAdmonition,
                    contents: () => <ChangeAdmonitionType />,
                  },
                  { fallback: () => <BlockTypeSelect /> },
                ]}
              />
              <Separator />
              <UndoRedo />
              <Separator />
              <StrikeThroughSupSubToggles />
              <Separator />
              <ListsToggle />

              <Separator />

              <CreateLink />
              <InsertImage />

              <Separator />

              <InsertTable />
              <InsertThematicBreak />

              <Separator />
              <InsertCodeBlock />
              {/* <InsertSandpack /> */}

              <ConditionalContents
                options={[
                  {
                    when: (editorInFocus) => !whenInAdmonition(editorInFocus),
                    contents: () => (
                      <>
                        <Separator />
                        <InsertAdmonition />
                      </>
                    ),
                  },
                ]}
              />

              <Separator />
              <InsertFrontmatter />
            </>
          ),
        },
      ]}
    />
  );
};

export const plugins = ({
  before,
  readonly,
}: {
  before?: string;
  readonly?: boolean;
}) => {
  return [
    ...(!readonly
      ? [
          toolbarPlugin({
            toolbarClassName:
              "editor-header sticky top-0 z-10 !bg-default-50 !*:text-neutral-50 ",
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper
                  options={[
                    "rich-text",
                    "source",
                    ...((!!before ? ["diff"] : []) as ViewMode[]),
                  ]}
                >
                  <EditorTools />
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]
      : []),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({
      imageAutocompleteSuggestions: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
      imageUploadHandler: async () =>
        Promise.resolve("https://picsum.photos/200/300"),
    }),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
    sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
    // sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
    codeMirrorPlugin(codeMirrorConfig),
    directivesPlugin({
      directiveDescriptors: [
        YoutubeDirectiveDescriptor,
        AdmonitionDirectiveDescriptor,
      ],
    }),
    diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: before }),
    markdownShortcutPlugin(),
  ];
};
