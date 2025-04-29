import Body from "@/components/body";
import Agrofast from "@/components/ui/agrofast";
import { useTranslations } from "next-intl";
import { getWebStaticPropsWithMessages } from "@/lib/getStaticProps";
import Head from "next/head";
import AuthCodeForm from "@/forms/auth-code-form";


export default function AuthCode() {
  const pt = useTranslations("Pages.AuthCode");

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-row" hideHeader hideFooter>
        <div className="flex flex-[5] justify-center md:items-center max-h-svh overflow-hidden overflow-y-auto">
          <div className="flex flex-col gap-4 px-8 py-6 w-full max-w-md min-h-max">
            <div className="flex flex-col items-center gap-2">
              <Agrofast.Logo className="w-40 h-10" />
            </div>
            <AuthCodeForm />
          </div>
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getWebStaticPropsWithMessages;
