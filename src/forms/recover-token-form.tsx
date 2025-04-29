import Input from "@/components/input/input";
import {
  Button,
  Form,
  Spacer,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const RecoverTokenForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (typeof window !== "undefined") {
    if (
      router.query.token === undefined ||
      router.query.token === "" ||
      typeof router.query.token !== "string"
    ) {
      // router.push("/web/reset-password");
      // return null;
    }
  }

  return (
    <>
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
    </>
  );
};

export default RecoverTokenForm;
