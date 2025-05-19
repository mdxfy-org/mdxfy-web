import Body from "@/components/body";
import MDxFy from "@/components/ui/mdxfy";
import { useTranslations } from "next-intl";
import { getWebStaticPropsWithMessages } from "@/lib/getStaticProps";
import Head from "next/head";
import SignInForm from "@/forms/sign-up-form";

export default function SignIn() {
  const t = useTranslations();
  const pt = useTranslations("Pages.SignUp");

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-row justify-center" hideHeader hideFooter>
        <div className="flex flex-col gap-4 px-4 md:px-8 py-6 w-full max-w-md min-h-max">
          <div className="flex flex-col items-center gap-2">
            <MDxFy.Logo className="w-min h-10" />
          </div>
          <p className="pb-2 font-semibold text-gray-700 dark:text-gray-200 text-2xl text-left">
            {t("UI.titles.create_account")}
          </p>
          <SignInForm />
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getWebStaticPropsWithMessages;
