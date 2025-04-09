import Body from "@/components/body";
import Agrofast from "@/components/ui/agrofast";
import { useTranslations } from "next-intl";
import { getWebStaticPropsWithMessages } from "@/lib/getStaticProps";
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
      <Body className="flex flex-row" hideHeader>
        <div className="flex flex-1 justify-center md:items-center max-h-svh overflow-hidden overflow-y-auto">
          <div className="flex flex-col gap-4 px-8 py-6 w-full max-w-md min-h-max">
            <div className="flex flex-col items-center gap-2">
              <Agrofast.Logo className="w-40 h-10" />
            </div>
            <p className="pb-2 font-semibold text-gray-700 dark:text-gray-200 text-2xl text-left">
              {t("UI.titles.inform_your_number")}
            </p>
            <ResetPasswordForm />
          </div>
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getWebStaticPropsWithMessages;
