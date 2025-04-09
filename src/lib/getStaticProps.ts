export const getPortfolioStaticPropsWithMessages = async ({
  locale = "pt-BR",
}: {
  locale: string;
}) => {
  return getStaticPropsWithMessages({ locale: locale });
};

export const getWebStaticPropsWithMessages = async ({
  locale = "pt-BR",
}: {
  locale: string;
}) => {
  return getStaticPropsWithMessages({ locale: locale });
};

export const getLegalStaticPropsWithMessages = async ({
  locale = "pt-BR",
}: {
  locale: string;
}) => {
  return getStaticPropsWithMessages({ locale: locale });
};

export const getStaticPropsWithMessages = async ({
  locale = "pt-BR",
}: {
  locale: string;
}) => {
  const [base, legal, portfolio, web] = await Promise.all([
    import(`../../messages/${locale}/default.json`),
    import(`../../messages/${locale}/legal.json`),
    import(`../../messages/${locale}/portfolio.json`),
    import(`../../messages/${locale}/web.json`),
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

  return { props: { messages } };
};
