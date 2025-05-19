import Layout from "@/components/layout";
import { getPortfolioStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useTranslations } from "next-intl";
import Head from "next/head";

export default function About() {
  const t = useTranslations();

  return (
    <>
      <Head>
        <title>{t("Pages.About.meta.title")}</title>
        <meta name="description" content={t("Pages.About.meta.description")} />
      </Head>
      <Layout className="flex flex-col gap-10 w-full">
        <section className="flex flex-col items-start gap-6 mx-auto p-4 max-w-[912px] container">
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = getPortfolioStaticPropsWithMessages;
