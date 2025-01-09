import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { IMarkdownEditor } from "@uiw/react-markdown-editor";
import { useCallback, useEffect } from "react";
import { useTheme } from "next-themes";

// const getCommands = dynamic(
//   () => import("@uiw/react-markdown-editor").then((mod) => mod.getCommands),
//   { ssr: false }
// );

const UiwMarkdownEditorModule = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod),
  { ssr: false }
);

interface MarkdownEditorProps extends IMarkdownEditor {
  className?: string;
}

const MarkdownEditor = ({ ...props }: MarkdownEditorProps) => {
  const { theme } = useTheme();
  // const [commands, setCommands] = useState(getCommands());

  const setupDefaultCommands = useCallback(() => {
    // setCommands((prevCommands) => {
    //   const newCommands = [...prevCommands];
    //   newCommands[0].icon = <span>🔥</span>;
    //   return newCommands;
    // });
  }, []);

  useEffect(() => {
    setupDefaultCommands();
  }, [setupDefaultCommands]);

  return (
    <>
      <div data-color-mode={theme} className="h-min">
        <UiwMarkdownEditorModule
          {...props}
          previewProps={{
            className: "markdown-body",
          }}
        />
      </div>
    </>
  );
};

export default MarkdownEditor;
