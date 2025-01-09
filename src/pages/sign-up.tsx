import Body from "@/components/body";
import {
  Button,
  Form,
  Spacer,
} from "@nextui-org/react";
import { useState } from "react";
import mdxfy from "@/components/ui/mdxfy";
import Input from "@/components/input";
import { useTranslations } from "next-intl";
import { getStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useRouter } from "next/router";
import Head from "next/head";
import api from "@/service/api";
import { useLanguage } from "@/contexts/language-provider";
import { useOverlay } from "@/contexts/overlay-provider";
import { useUser } from "@/contexts/auth-provider";
import Link from "next/link";
import Mdxfy from "@/components/ui/mdxfy";

export default function SignIn() {
  const router = useRouter();
  const t = useTranslations();
  const { translateResponse } = useLanguage();
  const { setUser, setTempToken } = useUser();
  const { setIsLoading } = useOverlay();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setIsLoading(true);
    api
      .post("/user", data)
      .then(({ data }) => {
        api.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${data.token}`;
          return config;
        });
        setTempToken(data.token);
        setUser(data.user);
        router.push(`/auth-code`);
      })
      .catch(({ response: { data: error } }) => {
        const fields = translateResponse(error.fields);
        setErrors(fields);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>{t("Pages.SignUp.meta.title")}</title>
        <meta name="description" content={t("Pages.SignUp.meta.description")} />
      </Head>
      <Body className="flex flex-row" hideHeader>
        <div className="lg:flex flex-col flex-[4] justify-center items-center hidden">
          <Mdxfy.Logo />
        </div>
        <div className="flex flex-[5] justify-center md:items-center max-h-svh overflow-hidden overflow-y-auto">
          <div className="flex flex-col gap-4 px-8 py-6 w-full max-w-md min-h-max">
            <div className="flex flex-col items-center gap-2">
              <mdxfy.Logo className="w-40 h-10" />
            </div>
            <p className="pb-2 font-semibold text-2xl text-gray-700 text-left dark:text-gray-200">
              {t("UI.titles.create_account")}
            </p>
            <Form
              className="flex flex-col gap-4"
              validationBehavior="native"
              validationErrors={errors}
              onSubmit={handleSubmit}
            >
              <Input
                isRequired
                className="text-gray-700 dark:text-gray-200"
                label={t("UI.labels.name")}
                labelPlacement="outside"
                name="name"
                placeholder={t("UI.placeholders.write_name")}
                type="name"
                autoCapitalize="words"
                variant="bordered"
              />
              <Input
                isRequired
                className="text-gray-700 dark:text-gray-200"
                label={t("UI.labels.surname")}
                labelPlacement="outside"
                name="surname"
                placeholder={t("UI.placeholders.write_surname")}
                type="name"
                autoCapitalize="words"
                variant="bordered"
              />
              <Input
                isRequired
                className="text-gray-700 dark:text-gray-200"
                label={t("UI.labels.email")}
                labelPlacement="outside"
                name="email"
                placeholder={t("UI.placeholders.write_email")}
                type="text"
                variant="bordered"
              />
              <Input
                isRequired
                taggableVisibility
                className="text-gray-700 dark:text-gray-200"
                label={t("UI.labels.password")}
                labelPlacement="outside"
                name="password"
                placeholder={t("UI.placeholders.write_password")}
                type="password"
                variant="bordered"
              />
              <Input
                isRequired
                taggableVisibility
                className="text-gray-700 dark:text-gray-200"
                label={t("UI.labels.password_confirm")}
                labelPlacement="outside"
                name="password_confirm"
                placeholder={t("UI.placeholders.write_password_confirm")}
                type="password"
                variant="bordered"
              />
              <Spacer y={4} />
              <Button className="w-full" color="primary" type="submit">
                {t("UI.buttons.continue")}
              </Button>
            </Form>
            <p className="text-center text-small">
              <Link
                href="/login"
                className="hover:opacity-80 font-medium text-primary text-sm hover:underline transition-all"
              >
                {t("UI.redirects.enter_existing_account")}
              </Link>
            </p>
          </div>
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
