import { SandpackConfig } from "@mdxeditor/editor";

export const defaultSnippetContent = "".trim();

export const simpleSandpackConfig: SandpackConfig = {
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

export const codeMirrorConfig = {
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
    elixir: "Elixir",
    sql: "SQL",
    bash: "Bash",
    shell: "Shell",
    yaml: "YAML",
    json: "JSON",
    xml: "XML",
    markdown: "Markdown",
    "": "Unspecified",
  },
};
