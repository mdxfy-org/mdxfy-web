import Body from "@/components/body";
import Agrofast from "@/components/ui/agrofast";
import { getWebStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useTranslations } from "next-intl";
import Head from "next/head";

export default function InternalError() {
  const t = useTranslations();
  const pt = useTranslations("Pages.InternalError");

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="" hideHeader>
        <div className="flex flex-1 justify-center md:items-center pt-8 md:pt-0 h-svh max-h-svh overflow-hidden overflow-y-auto">
          <div className="flex flex-col gap-4 px-8 py-6 w-full max-w-md min-h-max">
            <div className="flex flex-col items-center">
              <Agrofast.Logo className="w-72 h-min" />
              <p className="py-2 font-semibold text-gray-700 dark:text-gray-200 text-2xl text-center">
                {t("Pages.InternalError.messages.an_error_has_occurred")}
              </p>
            </div>
          </div>
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getWebStaticPropsWithMessages;
