import Body from "@/components/body";
import { Button } from "@heroui/react";
import Agrofast from "@/components/ui/agrofast";
import { getPortfolioUrl } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { getWebStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useRouter } from "next/router";
import Head from "next/head";
import SignInForm from "@/forms/sign-up-form";
import { ArrowRightUp } from "@solar-icons/react";
import FormWrapper from "@/components/form-wrapper";
import CompactLanguageSelector from "@/components/ux/compact-language-selector";

export default function SignIn() {
  const router = useRouter();
  const t = useTranslations();
  const pt = useTranslations("Pages.SignUp");

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-row" hideHeader hideFooter>
        <div className="hidden lg:flex flex-col flex-[4] justify-center items-center">
          <section className="flex flex-col items-start gap-4 p-4">
            <h1 className="font-mono font-light text-gray-700 dark:text-gray-200 text-2xl">
              {t("Advertizement.titles.primary")}
            </h1>
            <h1 className="max-w-md font-inter font-bold text-gray-700 dark:text-gray-200 text-4xl">
              {t("Advertizement.subtitles.primary")}
            </h1>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              {t("Advertizement.descriptions.primary")}
            </p>
            <Button
              color="success"
              className="gap-1 text-white"
              onPress={() => {
                router.push(`${getPortfolioUrl()}/${router.locale}/about`);
              }}
            >
              {t("UI.redirects.see_more")}
              <ArrowRightUp />
            </Button>
          </section>
        </div>
        <FormWrapper>
          <div className="flex flex-col items-center gap-2">
            <Agrofast.Logo className="w-40 h-10" />
            <CompactLanguageSelector className="right-0 absolute" />
          </div>
          <p className="pb-2 font-semibold text-gray-700 dark:text-gray-200 text-2xl text-left">
            {t("UI.titles.create_account")}
          </p>
          <SignInForm />
        </FormWrapper>
      </Body>
    </>
  );
}

export const getStaticProps = getWebStaticPropsWithMessages;
