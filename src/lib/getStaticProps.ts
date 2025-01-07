export const getStaticPropsWithMessages = async ({
  locale = "pt-BR",
}: {
  locale: string;
}) => {
  const messages = (await import(`@messages/${locale}.json`)).default;
  return { props: { messages } };
};
