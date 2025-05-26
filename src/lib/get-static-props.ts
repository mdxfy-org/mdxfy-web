import { PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import getMessages from "./get-messages";

export const getStaticPropsWithMessages = async ({
  locale = "pt-BR",
}: {
  params?: ParsedUrlQuery;
  preview?: boolean;
  previewData?: PreviewData;
  locale: string;
}) => {
  const messages = await getMessages(locale);

  return {
    props: { messages },
  };
};
