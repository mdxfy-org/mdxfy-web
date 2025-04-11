import Layout from "@/components/layout";
import { getWebStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Editor from "@/components/mark-down-editor";

export default function Index() {
  // const t = useTranslations();
  const pt = useTranslations("Pages.Index");

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Layout className="flex flex-col gap-10 pt-20 w-full">
        <section className="flex flex-col items-start gap-6 mx-auto p-4 max-w-[912px] container">
          <Editor  />
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = getWebStaticPropsWithMessages;
