import Body from "@/components/body";
import { Button, Form, Spacer } from "@heroui/react";
import { useState } from "react";
import { numberInputMask } from "@/lib/utils";
import Input from "@/components/input";
import { useTranslations } from "next-intl";
import { getWebStaticPropsWithMessages } from "@/lib/getStaticProps";
import Head from "next/head";
import api from "@/service/api";
import { useOverlay } from "@/contexts/overlay-provider";
import { useAuth } from "@/contexts/auth-provider";

import userPicture from "@public/img/user-default.png";
import { useLanguage } from "@/contexts/language-provider";
import PhoneNumberHelper from "@/components/ux/phone-number-helper";
import PictureInput from "@/components/picture-input";
import { useToast } from "@/service/toast";
import { uploadPicture } from "@/http/user/upload-picture";

export default function Profile() {
  const t = useTranslations();
  const pt = useTranslations("Pages.SignUp");
  const toast = useToast();

  const { translateResponse } = useLanguage();
  const { user, setUser } = useAuth();
  const { setIsLoading } = useOverlay();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setIsLoading(true);
    api
      .put("/user", data)
      .then(({ data }) => {
        api.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${data.token}`;
          return config;
        });
      })
      .catch(({ response: { data: error } }) => {
        const fields = translateResponse(error.fields);
        setErrors(fields);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmitPicture = async (file: FormData) => {
    setIsLoading(true);
    uploadPicture(file)
      .then(({ data }) => {
        setUser(data.user);
        toast.success({
          description: t("Messages.success.image_uploaded_successfully"),
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>{pt("meta.title")}</title>
        <meta name="description" content={pt("meta.description")} />
      </Head>
      <Body className="flex flex-row justify-center">
        <div className="flex flex-col flex-1 container">
          <div className="flex flex-row justify-center gap-4 px-8 py-6 w-full min-h-max">
            <Form
              className="flex flex-col flex-1 gap-4 max-w-md"
              validationBehavior="native"
              validationErrors={errors}
              onSubmit={handleSubmit}
            >
              <p className="pr-8 pb-2 font-semibold text-gray-700 dark:text-gray-200 text-2xl text-left">
                {t("UI.titles.update_account")}
              </p>
              <div className="flex flex-row flex-1 justify-center gap-4 w-full">
                <div className="flex flex-col flex-1 items-center gap-4 max-w-md">
                  <PictureInput
                    name="profile"
                    label="Foto de perfil"
                    imageSrc={user?.profile_picture}
                    fallbackSrc={userPicture.src}
                    onSubmit={handleSubmitPicture}
                    onSuccess={({ onClose }) => {
                      onClose();
                    }}
                    onError={() => {
                      toast.error({
                        description: t(
                          "Messages.errors.failed_to_upload_profile_picture"
                        ),
                      });
                    }}
                  />
                </div>
              </div>
              <Input
                name="name"
                label={t("UI.labels.name")}
                placeholder={t("UI.placeholders.write_name")}
                autoCapitalize="words"
                value={user?.name}
                type="name"
              />
              <Input
                className="text-gray-700 dark:text-gray-200"
                label={t("UI.labels.surname")}
                labelPlacement="outside"
                name="surname"
                placeholder={t("UI.placeholders.write_surname")}
                type="name"
                autoCapitalize="words"
                variant="bordered"
                value={user?.surname}
              />
              <Input
                name="number"
                label={t("UI.labels.number")}
                placeholder={t("UI.placeholders.write_number")}
                queryCollectable
                format={numberInputMask}
                endContent={<PhoneNumberHelper />}
                disabled
              />
              <Input
                name="email"
                label={t("UI.labels.email")}
                placeholder={t("UI.placeholders.write_email")}
                className="text-gray-700 dark:text-gray-200"
                type="email"
                value={user?.email}
                disabled
              />
              {/* <Input
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
                taggableVisibility
                className="text-gray-700 dark:text-gray-200"
                label={t("UI.labels.password_confirm")}
                labelPlacement="outside"
                name="password_confirm"
                placeholder={t("UI.placeholders.write_password_confirm")}
                type="password"
                variant="bordered"
              /> */}
              <Spacer y={4} />
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

export const getStaticProps = getWebStaticPropsWithMessages;
