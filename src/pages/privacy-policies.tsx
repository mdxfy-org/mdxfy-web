import Layout from "@/components/layout";
import { getLegalStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useTranslations } from "next-intl";
import Head from "next/head";

import {
  MainTitle,
  SectionTitle,
  SubTitle,
  BodyText,
} from "@/components/typography";

export default function PrivacyPolicies() {
  const t = useTranslations();
  const pp = useTranslations("Pages.PrivacyPolicies.content");

  return (
    <>
      <Head>
        <title>{t("Pages.PrivacyPolicies.meta.title")}</title>
        <meta
          name="description"
          content={t("Pages.PrivacyPolicies.meta.description")}
        />
      </Head>
      <Layout className="flex flex-col gap-8 pt-20 w-full">
        <section className="flex flex-col items-start gap-4 mx-auto p-4 container">
          <MainTitle>{pp("main_title")}</MainTitle>
          <section id="section_1" className="mt-8 w-full">
            <SectionTitle>{pp("section_1.title")}</SectionTitle>
            <BodyText>{pp("section_1.paragraph_1")}</BodyText>
          </section>
          <section id="section_2" className="mt-8 w-full">
            <SectionTitle>{pp("section_2.title")}</SectionTitle>
            <div
              id="subsection_2_1"
              className="mb-6 pl-4 border-gray-200 dark:border-gray-600 border-l-2"
            >
              <SubTitle>
                {pp("section_2.subsections.subsection_2_1.subtitle")}
              </SubTitle>
              <BodyText>
                {pp("section_2.subsections.subsection_2_1.paragraph_1")}
              </BodyText>
              <BodyText>
                {pp("section_2.subsections.subsection_2_1.paragraph_2")}
              </BodyText>
            </div>
            <div
              id="subsection_2_2"
              className="mb-6 pl-4 border-gray-200 dark:border-gray-600 border-l-2"
            >
              <SubTitle>
                {pp("section_2.subsections.subsection_2_2.subtitle")}
              </SubTitle>
              <BodyText>
                {pp("section_2.subsections.subsection_2_2.paragraph_1")}
              </BodyText>
              <BodyText>
                {pp("section_2.subsections.subsection_2_2.paragraph_2")}
              </BodyText>
            </div>
            <div
              id="subsection_2_3"
              className="mb-6 pl-4 border-gray-200 dark:border-gray-600 border-l-2"
            >
              <SubTitle>
                {pp("section_2.subsections.subsection_2_3.subtitle")}
              </SubTitle>
              <BodyText>
                {pp("section_2.subsections.subsection_2_3.paragraph_1")}
              </BodyText>
            </div>
            <div
              id="subsection_2_4"
              className="mb-6 pl-4 border-gray-200 dark:border-gray-600 border-l-2"
            >
              <SubTitle>
                {pp("section_2.subsections.subsection_2_4.subtitle")}
              </SubTitle>
              <BodyText>
                {pp("section_2.subsections.subsection_2_4.paragraph_1")}
              </BodyText>
              <BodyText>
                {pp("section_2.subsections.subsection_2_4.paragraph_2")}
              </BodyText>
            </div>
            <div
              id="subsection_2_5"
              className="mb-6 pl-4 border-gray-200 dark:border-gray-600 border-l-2"
            >
              <SubTitle>
                {pp("section_2.subsections.subsection_2_5.subtitle")}
              </SubTitle>
              <BodyText>
                {pp("section_2.subsections.subsection_2_5.paragraph_1")}
              </BodyText>
              <BodyText>
                {pp("section_2.subsections.subsection_2_5.paragraph_2")}
              </BodyText>
              <BodyText>
                {pp("section_2.subsections.subsection_2_5.paragraph_3")}
              </BodyText>
            </div>
            <div
              id="subsection_2_6"
              className="mb-6 pl-4 border-gray-200 dark:border-gray-600 border-l-2"
            >
              <SubTitle>
                {pp("section_2.subsections.subsection_2_6.subtitle")}
              </SubTitle>
              <BodyText>
                {pp("section_2.subsections.subsection_2_6.paragraph_1")}
              </BodyText>
            </div>
            <div
              id="subsection_2_7"
              className="mb-6 pl-4 border-gray-200 dark:border-gray-600 border-l-2"
            >
              <SubTitle>
                {pp("section_2.subsections.subsection_2_7.subtitle")}
              </SubTitle>
              <BodyText>
                {pp("section_2.subsections.subsection_2_7.paragraph_1")}
              </BodyText>
            </div>
          </section>
          <section id="section_3" className="mt-8 w-full">
            <SectionTitle>{pp("section_3.title")}</SectionTitle>
            <BodyText>{pp("section_3.paragraph_1")}</BodyText>
            <BodyText>{pp("section_3.paragraph_2")}</BodyText>
            <BodyText>{pp("section_3.paragraph_3")}</BodyText>
            <BodyText>{pp("section_3.paragraph_4")}</BodyText>
            <BodyText>{pp("section_3.paragraph_5")}</BodyText>
            <BodyText>{pp("section_3.paragraph_6")}</BodyText>
            <BodyText>{pp("section_3.paragraph_7")}</BodyText>
          </section>
          <section id="section_4" className="mt-8 w-full">
            <SectionTitle>{pp("section_4.title")}</SectionTitle>
            <BodyText>{pp("section_4.paragraph_1")}</BodyText>
            <BodyText>{pp("section_4.paragraph_2")}</BodyText>
            <BodyText>{pp("section_4.paragraph_3")}</BodyText>
            <BodyText>{pp("section_4.paragraph_4")}</BodyText>
          </section>
          <section id="section_5" className="mt-8 w-full">
            <SectionTitle>{pp("section_5.title")}</SectionTitle>
            <BodyText>{pp("section_5.paragraph_1")}</BodyText>
            <BodyText>{pp("section_5.paragraph_2")}</BodyText>
          </section>
          <section id="section_6" className="mt-8 w-full">
            <SectionTitle>{pp("section_6.title")}</SectionTitle>
            <BodyText>{pp("section_6.paragraph_1")}</BodyText>
            <BodyText>{pp("section_6.paragraph_2")}</BodyText>
            <BodyText>{pp("section_6.paragraph_3")}</BodyText>
          </section>
          <section id="section_7" className="mt-8 w-full">
            <SectionTitle>{pp("section_7.title")}</SectionTitle>
            <BodyText>{pp("section_7.paragraph_1")}</BodyText>
            <BodyText>{pp("section_7.paragraph_2")}</BodyText>
            <BodyText>{pp("section_7.paragraph_3")}</BodyText>
          </section>
          <section id="section_8" className="mt-8 w-full">
            <SectionTitle>{pp("section_8.title")}</SectionTitle>
            <BodyText>{pp("section_8.paragraph_1")}</BodyText>
          </section>
          <section id="section_9" className="mt-8 w-full">
            <SectionTitle>{pp("section_9.title")}</SectionTitle>
            <BodyText>{pp("section_9.paragraph_1")}</BodyText>
          </section>
          <section id="section_10" className="mt-8 w-full">
            <SectionTitle>{pp("section_10.title")}</SectionTitle>
            <BodyText>{pp("section_10.paragraph_1")}</BodyText>
          </section>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = getLegalStaticPropsWithMessages;
