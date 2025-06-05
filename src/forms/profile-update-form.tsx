import Form from "@/components/form/form";
import PictureInput from "@/components/input/picture-input";
import { useUser } from "@/contexts/auth-provider";
import { useOverlay } from "@/contexts/overlay-provider";
import { uploadPicture } from "@/http/user/upload-picture";
import api from "@/service/api";
import { useTranslations } from "next-intl";
import { useState } from "react";
import userPicture from "@public/img/user-default.png";
import { useToast } from "@/service/toast";
import Input from "@/components/input/input";
import { Spacer } from "@heroui/react";
import Button from "@/components/button";
import { FormValues } from "@/types/form";

export const ProfileUpdateForm: React.FC = () => {
  const t = useTranslations();
  const toast = useToast();
  const { setIsLoading } = useOverlay();

  const { user, setUser } = useUser();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (data: FormValues) => {
    setIsLoading(true);
    api
      .put("/user", data)
      .then(({ data }) => {
        api.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${data.token}`;
          return config;
        });
      })
      .catch(({ data }) => {
        setErrors(data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmitPicture = async (file: FormData) => {
    setIsLoading(true);
    return uploadPicture(file);
  };

  return (
    <Form
      className="flex flex-col flex-1 gap-4 p-4 max-w-md"
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
            onSuccess={({ user }) => {
              setUser(user);
              toast.success({
                description: t("Messages.success.image_uploaded_successfully"),
              });
            }}
            onError={() => {
              toast.error({
                description: t(
                  "Messages.errors.failed_to_upload_profile_picture"
                ),
              });
            }}
            onFinally={() => {
              setIsLoading(false);
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
        label={t("UI.labels.username")}
        labelPlacement="outside"
        name="username"
        placeholder={t("UI.placeholders.write_username")}
        type="name"
        autoCapitalize="words"
        variant="bordered"
        value={user?.username}
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
      <Button className="w-full" color="primary" type="submit" confirmAction>
        {t("UI.buttons.continue")}
      </Button>
    </Form>
  );
};
