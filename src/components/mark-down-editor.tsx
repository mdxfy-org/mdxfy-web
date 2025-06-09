"use client";
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { MDXEditor } from "@mdxeditor/editor";
import { cn } from "@heroui/react";
import { plugins } from "./ux/mdx-boilerplate";

export interface EditorProps extends MDXEditorProps {
  before?: string;
  readonly?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  before,
  markdown,
  onChange,
  readonly,
  placeholder,
  contentEditableClassName,
  ...props
}) => {
  const ref = React.useRef<MDXEditorMethods>(null);

  const t = useTranslations();

  useEffect(() => {
    if (markdown) {
      ref.current?.setMarkdown(markdown);
    }
  }, [markdown]);

  return (
    <>
      <MDXEditor
        ref={ref}
        placeholder={placeholder}
        className={cn(
          "bg-default-100/15 border-2 border-default-200 rounded-xl w-full overflow-hidden duration-100",
          readonly
            ? "editor-readonly"
            : "hover:border-default-400 focus-within:!border-default-600"
        )}
        contentEditableClassName={cn(
          "!w-full !max-w-full editor-content prose",
          contentEditableClassName,
        )}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        translation={(key, _, interpolations) => t(key as any, interpolations)}
        markdown={markdown ?? ""}
        onChange={onChange}
        plugins={plugins({ before, readonly })}
        readOnly={readonly}
        trim
        {...props}
      />
    </>
  );
};

export default Editor;
