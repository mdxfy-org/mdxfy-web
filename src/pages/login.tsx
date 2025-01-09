import Body from "@/components/body";
import {
  Button,
  Checkbox,
  Form,
} from "@nextui-org/react";
import { useState } from "react";
import Input from "@/components/input";
import { useTranslations } from "next-intl";
import { getStaticPropsWithMessages } from "@/lib/getStaticProps";
import { useRouter } from "next/router";
import Head from "next/head";
import api from "@/service/api";
import { useOverlay } from "@/contexts/overlay-provider";
import { useUser } from "@/contexts/auth-provider";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-provider";
import Mdxfy from "@/components/ui/mdxfy";

export default function Login() {
  const router = useRouter();
  const t = useTranslations();
  const { setIsLoading } = useOverlay();
  const { translateResponse } = useLanguage();
  const { setUser, setTempToken } = useUser();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setIsLoading(true);
    api
      .post("/user/login", data)
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
        <title>{t("Pages.Login.meta.title")}</title>
        <meta name="description" content={t("Pages.Login.meta.description")} />
      </Head>
      <Body className="flex flex-row" hideHeader>
        <div className="lg:flex flex-col flex-[4] justify-center items-center hidden">
          <section className="flex flex-col items-start gap-4 p-4">
            <Mdxfy.Logo className="w-40 h-10" />
          </section>
        </div>
        <div className="flex flex-[5] justify-center md:items-center max-h-svh overflow-hidden overflow-y-auto">
          <div className="flex flex-col gap-4 px-8 py-6 w-full max-w-md min-h-max">
            <div className="flex flex-col items-center gap-2">
              <Mdxfy.Logo className="w-40 h-10" />
            </div>
            <p className="pb-2 font-semibold text-2xl text-gray-700 text-left dark:text-gray-200">
              {t("UI.redirects.enter_existing_account")}
            </p>
            <Form
              className="flex flex-col flex-1 gap-4"
              validationBehavior="native"
              validationErrors={errors}
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col flex-1 md:flex-auto gap-4 w-full">
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
                  className="text-gray-700 dark:text-gray-200"
                  label={t("UI.labels.password")}
                  labelPlacement="outside"
                  name="password"
                  placeholder={t("UI.placeholders.write_password")}
                  type="password"
                  variant="bordered"
                />
                <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-2 px-1 py-2 w-full">
                  <Checkbox
                    defaultSelected
                    name="remember"
                    value="true"
                    size="sm"
                  >
                    {t("UI.checkboxes.remember_me")}
                  </Checkbox>
                  <Link
                    href="/forgot-pass"
                    className="hover:opacity-80 font-medium text-primary text-sm hover:underline transition-all"
                  >
                    {t("UI.redirects.forgot_password")}
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <Button className="w-full" color="primary" type="submit">
                  {t("UI.buttons.enter")}
                </Button>
                <p className="text-center text-small">
                  <Link
                    href="/sign-up"
                    className="hover:opacity-80 font-medium text-primary text-sm hover:underline transition-all"
                  >
                    {t("UI.redirects.create_account")}
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </Body>
    </>
  );
}

export const getStaticProps = getStaticPropsWithMessages;
