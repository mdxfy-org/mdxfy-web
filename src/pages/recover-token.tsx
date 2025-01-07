import Body from "@/components/body";
import { Button, Form, Spacer } from "@nextui-org/react";
import mdxfy from "@/components/ui/mdxfy";
import Input from "@/components/input";
import { useTranslations } from "next-intl";
import { getStaticPropsWithMessages } from "@/lib/getStaticProps";
import Head from "next/head";
import { useRouter } from "next/router";

export default function RecoverToken() {
  const t = useTranslations();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

  if (typeof window !== "undefined") {
    if (router.query.token === undefined || router.query.token === "" || typeof router.query.token !== "string") {
      // router.push("/forgot-pass");
      // return null;
    }
  }

  return (
    <>
      <Head>
        <title>{t("Pages.RecoverToken.meta.title")}</title>
        <meta name="description" content={t("Pages.RecoverToken.meta.description")} />
      </Head>
      <Body className="flex flex-row" hideHeader>
        <div className="flex flex-[5] justify-center md:items-center max-h-svh overflow-hidden overflow-y-auto">
          <div className="flex flex-col gap-4 px-8 py-6 w-full max-w-md min-h-max">
            <div className="flex flex-col items-center gap-2">
              <mdxfy.Logo className="w-40 h-10" />
            </div>
            <p className="pb-2 font-semibold text-2xl text-gray-700 text-left dark:text-gray-200">
              {t("UI.titles.create_new_password")}
            </p>
            <Form
              className="flex flex-col gap-4"
              validationBehavior="native"
              onSubmit={handleSubmit}
            >
              <Input
                isRequired
                taggableVisibility
                className="text-gray-700 dark:text-gray-200"
                label={t("UI.labels.new_password")}
                labelPlacement="outside"
                name="password"
                placeholder={t("UI.placeholders.write_new_password")}
                type="password"
                variant="bordered"
              />
              <Input
                isRequired
                taggableVisibility
                className="text-gray-700 dark:text-gray-200"
                label={t("UI.labels.new_password_confirm")}
                labelPlacement="outside"
                name="password_confirm"
                placeholder={t("UI.placeholders.write_new_password_confirm")}
                type="password"
                variant="bordered"
              />
              <Spacer y={8} />
              <Button className="w-full" color="primary" type="submit">
                {t("UI.buttons.continue")}
              </Button>
            </Form>
          </div>
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
