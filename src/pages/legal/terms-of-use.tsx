import Layout from "@/components/layout";
import { getLegalStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useTranslations } from "next-intl";
import Head from "next/head";

import { MainTitle, SectionTitle, BodyText } from "@/components/typography";

export default function TermsOfUse() {
  const t = useTranslations();
  const tou = useTranslations("Pages.TermsOfUse.content");

  return (
    <>
      <Head>
        <title>{t("Pages.TermsOfUse.meta.title")}</title>
        <meta
          name="description"
          content={t("Pages.TermsOfUse.meta.description")}
        />
      </Head>
      <Layout className="flex flex-col gap-8 pt-20 w-full">
        <section className="flex flex-col items-start gap-4 mx-auto p-4 container">
          <MainTitle>{tou("main_title")}</MainTitle>
          <section id="section_1" className="mt-8 w-full">
            <SectionTitle>{tou("section_1.title")}</SectionTitle>
            <BodyText>{tou("section_1.paragraph_1")}</BodyText>
            <BodyText>{tou("section_1.paragraph_2")}</BodyText>
          </section>
          <section id="section_2" className="mt-8 w-full">
            <SectionTitle>{tou("section_2.title")}</SectionTitle>
            <BodyText>{tou("section_2.paragraph_1")}</BodyText>
            <BodyText>{tou("section_2.paragraph_2")}</BodyText>
          </section>
          <section id="section_3" className="mt-8 w-full">
            <SectionTitle>{tou("section_3.title")}</SectionTitle>
            <BodyText>{tou("section_3.paragraph_1")}</BodyText>
            <BodyText>{tou("section_3.paragraph_2")}</BodyText>
          </section>
          <section id="section_4" className="mt-8 w-full">
            <SectionTitle>{tou("section_4.title")}</SectionTitle>
            <BodyText>{tou("section_4.paragraph_1")}</BodyText>
            <BodyText>{tou("section_4.paragraph_2")}</BodyText>
            <BodyText>{tou("section_4.paragraph_3")}</BodyText>
            <BodyText className="whitespace-pre-line">
              {tou("section_4.paragraph_4")}
            </BodyText>
          </section>
          <section id="section_5" className="mt-8 w-full">
            <SectionTitle>{tou("section_5.title")}</SectionTitle>
            <BodyText>{tou("section_5.paragraph_1")}</BodyText>
            <BodyText>{tou("section_5.paragraph_2")}</BodyText>
          </section>
          <section id="section_6" className="mt-8 w-full">
            <SectionTitle>{tou("section_6.title")}</SectionTitle>
            <BodyText>{tou("section_6.paragraph_1")}</BodyText>
            <BodyText>{tou("section_6.paragraph_2")}</BodyText>
          </section>
          <section id="section_7" className="mt-8 w-full">
            <SectionTitle>{tou("section_7.title")}</SectionTitle>
            <BodyText>{tou("section_7.paragraph_1")}</BodyText>
            <BodyText>{tou("section_7.paragraph_2")}</BodyText>
          </section>
          <section id="section_8" className="mt-8 w-full">
            <SectionTitle>{tou("section_8.title")}</SectionTitle>
            <BodyText>{tou("section_8.paragraph_1")}</BodyText>
            <BodyText>{tou("section_8.paragraph_2")}</BodyText>
          </section>
          <section id="section_9" className="mt-8 w-full">
            <SectionTitle>{tou("section_9.title")}</SectionTitle>
            <BodyText>{tou("section_9.paragraph_1")}</BodyText>
            <BodyText className="whitespace-pre-line">
              {tou("section_9.paragraph_2")}
            </BodyText>
          </section>
          <section id="section_10" className="mt-8 w-full">
            <SectionTitle>{tou("section_10.title")}</SectionTitle>
            <BodyText>{tou("section_10.paragraph_1")}</BodyText>
          </section>
          <section id="section_11" className="mt-8 w-full">
            <SectionTitle>{tou("section_11.title")}</SectionTitle>
            <BodyText>{tou("section_11.paragraph_1")}</BodyText>
            <BodyText>{tou("section_11.paragraph_2")}</BodyText>
          </section>
          <section id="section_12" className="mt-8 w-full">
            <SectionTitle>{tou("section_12.title")}</SectionTitle>
            <BodyText>{tou("section_12.paragraph_1")}</BodyText>
            <BodyText>{tou("section_12.paragraph_2")}</BodyText>
          </section>
          <section id="section_13" className="mt-8 w-full">
            <SectionTitle>{tou("section_13.title")}</SectionTitle>
            <BodyText>{tou("section_13.paragraph_1")}</BodyText>
            <BodyText>{tou("section_13.paragraph_2")}</BodyText>
            <BodyText className="font-bold">
              {tou("section_13.paragraph_3")}
            </BodyText>
          </section>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = getLegalStaticPropsWithMessages;
