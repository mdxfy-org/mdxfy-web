import Body from "@/components/body";
import MDxFy from "@/components/ui/mdxfy";
import { useTranslations } from "next-intl";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import Head from "next/head";
import ResetPasswordForm from "@/forms/reset-password-form";

export default function ForgotPass() {
  const t = useTranslations();
  const pt = useTranslations("Pages.ForgotPass");

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-row" hideHeader hideFooter>
        <div className="flex flex-col gap-4 px-4 md:px-8 py-6 w-full max-w-md min-h-max">
          <div className="flex flex-col items-center gap-2">
            <MDxFy.Logo className="w-40 h-10" />
          </div>
          <p className="pb-2 font-semibold text-gray-700 dark:text-gray-200 text-2xl text-left">
            {t("UI.titles.inform_your_number")}
          </p>
          <ResetPasswordForm />
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
