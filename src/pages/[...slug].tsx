import Body from "@/components/body";
// import { getStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useTranslations } from "next-intl";
import Head from "next/head";

export default function Index() {
  const t = useTranslations();

  return (
    <>
      <Head>
        <title>{t("Index.meta_title")}</title>
        <meta name="description" content={t("Index.meta_description_1")} />
      </Head>
      <Body>
        <div className="flex flex-1">
          <div className="flex flex-col flex-1 gap-2 p-2 md:p-10 w-full h-full">
            <div className="flex gap-2">
              {[...new Array(4)].map((i) => (
                <div
                  key={"first" + i}
                  className="bg-gray-200 dark:bg-neutral-700 rounded-lg w-full h-20"
                ></div>
              ))}
            </div>
            <div className="flex flex-1 gap-2">
              {[...new Array(2)].map((i) => (
                <div
                  key={"second" + i}
                  className="bg-gray-200 dark:bg-neutral-700 rounded-lg w-full h-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </Body>
    </>
  );
}

// export const getStaticProps = getStaticPropsWithMessages;
