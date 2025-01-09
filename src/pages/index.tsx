import Body from "@/components/body";
import MarkdownEditor from "@/components/markdown-editor";
import { getStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useTranslations } from "next-intl";
import Head from "next/head";

export default function Index() {
  const t = useTranslations();

  return (
    <>
      <Head>
        <title>{t("Pages.Index.meta.title")}</title>
        <meta name="description" content={t("Pages.Index.meta.description")} />
      </Head>
      <Body className="flex flex-row justify-center">
        <div className="flex flex-col flex-1 container">
          <MarkdownEditor className="flex-1 max-h-full" />
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
