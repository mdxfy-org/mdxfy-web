import Body from "@/components/body";
import Agrofast from "@/components/ui/agrofast";
import { useTranslations } from "next-intl";
import { getWebStaticPropsWithMessages } from "@/lib/getStaticProps";
import Head from "next/head";
import RecoverTokenForm from "@/forms/recover-token-form";
import FormWrapper from "@/components/form-wrapper";

export default function RecoverToken() {
  const t = useTranslations();
  const pt = useTranslations("Pages.RecoverToken");

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-row" hideHeader hideFooter>
        <FormWrapper>
          <div className="flex flex-col items-center gap-2">
            <Agrofast.Logo className="w-40 h-10" />
          </div>
          <p className="pb-2 font-semibold text-gray-700 dark:text-gray-200 text-2xl text-left">
            {t("UI.titles.create_new_password")}
          </p>
          <RecoverTokenForm />
        </FormWrapper>
      </Body>
    </>
  );
}

export const getStaticProps = getWebStaticPropsWithMessages;
