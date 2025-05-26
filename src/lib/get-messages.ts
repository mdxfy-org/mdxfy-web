const getMessages = async (locale: string) => {
  const [base, legal, portfolio, web, mdx_editor] = await Promise.all([
    import(`../../messages/${locale}/default.json`),
    import(`../../messages/${locale}/legal.json`),
    import(`../../messages/${locale}/portfolio.json`),
    import(`../../messages/${locale}/web.json`),
    import(`../../messages/${locale}/mdx-editor.json`),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deepMerge = (target: any, source: any): any => {
    Object.keys(source).forEach((key) => {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        if (!target[key] || typeof target[key] !== "object") {
          target[key] = {};
        }
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    });
    return target;
  };

  const messages = {};
  deepMerge(messages, base.default);
  deepMerge(messages, portfolio.default);
  deepMerge(messages, legal.default);
  deepMerge(messages, web.default);
  deepMerge(messages, mdx_editor.default);

  return messages;
};

export default getMessages;
