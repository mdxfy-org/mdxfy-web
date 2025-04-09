import Body from "@/components/body";
import { ArrowUpRight01Icon } from "@hugeicons/react";
import {
  Button,
} from "@heroui/react";
import Agrofast from "@/components/ui/agrofast";
import { getPortfolioUrl } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { getWebStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useRouter } from "next/router";
import Head from "next/head";
import LoginForm from "@/forms/login-form";

export default function Login() {
  const router = useRouter();
  const t = useTranslations();
  const pt = useTranslations("Pages.Login");

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-row" hideHeader>
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
              <ArrowUpRight01Icon />
            </Button>
          </section>
        </div>
        <div className="flex flex-[5] justify-center md:items-center max-h-svh overflow-hidden overflow-y-auto">
          <div className="flex flex-col gap-4 px-8 py-6 w-full max-w-md min-h-max">
            <div className="flex flex-col items-center gap-2">
              <Agrofast.Logo className="w-40 h-10" />
            </div>
            <p className="flex pb-2 font-semibold text-gray-700 dark:text-gray-200 text-2xl text-left">
              {t("UI.redirects.enter_existing_account")}
            </p>
            <LoginForm />
          </div>
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getWebStaticPropsWithMessages;
