import Body from "@/components/body";
import MDxFy from "@/components/ui/mdxfy";
import { useTranslations } from "next-intl";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import Head from "next/head";
import LoginForm from "@/forms/login-form";
import CompactLanguageSelector from "@/components/ux/compact-language-selector";

export default function Login() {
  const t = useTranslations();
  const pt = useTranslations("Pages.Login");

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body
        className="flex flex-row justify-center h-svh"
        hideHeader
        hideFooter
      >
        <div className="flex flex-col md:justify-center gap-4 p-4 md:px-8 md:py-6 w-full max-w-md min-h-max">
          <div className="relative flex flex-col items-center gap-2">
            <MDxFy.Logo className="w-40 h-10" />
            <CompactLanguageSelector className="top-1/2 right-0 absolute -translate-y-1/2" />
          </div>
          <p className="flex pb-2 font-semibold text-gray-700 dark:text-gray-200 text-2xl text-left">
            {t("UI.redirects.enter_existing_account")}
          </p>
          <LoginForm />
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
