import Layout from "@/components/layout";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import { GetStaticPaths } from "next";
import { useTranslations } from "next-intl";
import { Params } from "next/dist/server/request/params";
import Head from "next/head";

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
        <section className="flex flex-col items-start gap-6 mx-auto p-4 max-w-[912px] container"></section>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps = getStaticPropsWithMessages;
