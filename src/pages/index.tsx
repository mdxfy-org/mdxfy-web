import Layout from "@/components/layout";
import { getWebStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";
import destinationRoute from "@public/assets/destination-route.png";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import { Button } from "@heroui/react";

export default function Index() {
  // const t = useTranslations();
  const pt = useTranslations("Pages.Index");

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Layout className="flex flex-col gap-10 pt-20 w-full">
        <section className="flex flex-col items-start gap-6 mx-auto p-4 max-w-[912px] container">
          <div className="flex flex-row md:bg-neutral-200/30 dark:md:bg-neutral-800/20 rounded-2xl w-full">
            <div className="flex-1 p-8">
              <h1 className="font-bold text-2xl">Para onde vamos hoje?</h1>
              <div className="flex flex-col gap-2 mt-4">
                <Input
                  label="De onde"
                  placeholder="Ex: Rua tal n. xx"
                  name="from"
                />
                <Input label="Para onde" placeholder="Para onde" name="to" />
                <div>
                  <DatePicker label="Escolha uma data" />
                </div>
                <Button color="primary">Lançar chamado</Button>
              </div>
            </div>
            <div className="hidden md:flex flex-1 p-6">
              <Image
                src={destinationRoute.src}
                className="shadow-sm rounded-lg min-w-full"
                width={500}
                height={500}
                alt=""
              />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = getWebStaticPropsWithMessages;
