import Input from "@/components/input";
import {
  Button,
  Form,
  Spacer,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import Link from "@/components/link";
import { useState } from "react";
import { useRouter } from "next/router";

const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();

  const [email, setEmail] = useState<string>(
    Array.isArray(router.query.email)
      ? router.query.email[0]
      : router.query.email || ""
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Form
        className="flex flex-col flex-1 gap-4"
        validationBehavior="native"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col flex-1 md:flex-auto w-full">
          <Input
            id="email"
            name="email"
            label={t("UI.labels.email")}
            placeholder={t("UI.placeholders.write_email")}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            isRequired
          />
        </div>
        <Spacer y={8} />
        <div className="flex flex-col gap-4 w-full">
          <p className="text-gray-700 dark:text-gray-200 text-small text-start">
            {t("Legal.agreements.login_terms")}
          </p>
          <Button className="w-full" color="primary" type="submit">
            {t("UI.buttons.enter")}
          </Button>
          <div className="flex justify-between text-small text-center">
            <Link
              href="/sign-up"
              className="hover:opacity-80 font-medium text-primary text-sm hover:underline transition-all"
            >
              {t("UI.redirects.create_account")}
            </Link>
            <Link
              href={{
                pathname: "/login",
                query: {
                  email: email,
                },
              }}
              className="hover:opacity-80 font-medium text-primary text-sm hover:underline transition-all"
            >
              {t("UI.redirects.enter_existing_account")}
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
