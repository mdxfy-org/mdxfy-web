import Body from "@/components/body";
import NotFound from "@/components/error/not-found";
import { getStaticPropsWithMessages } from "@/lib/get-static-props";
import { useTranslations } from "next-intl";
import Head from "next/head";

export default function Page404() {
  const pt = useTranslations("Pages.NotFound");

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="" hideHeader>
        <div className="flex flex-1 justify-center md:items-center pt-8 md:pt-0 max-h-svh overflow-hidden overflow-y-auto">
          <NotFound />
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
