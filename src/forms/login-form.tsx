import Checkbox from "@/components/checkbox";
import Input from "@/components/input";
import { useAuth } from "@/contexts/auth-provider";
import { useLanguage } from "@/contexts/language-provider";
import { useOverlay } from "@/contexts/overlay-provider";
import { Button, Form } from "@heroui/react";
import { useTranslations } from "next-intl";
import Link from "@/components/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { login } from "@/http/user/login";
import { AUTHENTICATED_KEY } from "@/middleware";
import { useCookies } from "react-cookie";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const { setIsLoading } = useOverlay();
  const { translateResponse } = useLanguage();
  const { setUser, setToken } = useAuth();

  const [, setCookie] = useCookies([AUTHENTICATED_KEY]);

  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setIsLoading(true);
    login(data)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
        if (data?.auth === "authenticate") {
          router.push("/auth-code");
        }
        if (data?.auth === "authenticated") {
          setCookie(AUTHENTICATED_KEY, "true");
          router.push("/");
        }
      })
      .catch(({ response: { data: error } }) => {
        const fields = translateResponse(error.errors);
        setErrors(fields);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Form
        className="flex flex-col flex-1 gap-4"
        validationBehavior="native"
        validationErrors={errors}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col flex-1 md:flex-auto gap-4 w-full">
          <Input
            id="email"
            name="email"
            label={t("UI.labels.email")}
            placeholder={t("UI.placeholders.write_email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            queryCollectable
            type="email"
            isRequired
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
          <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-2 px-1 py-2 w-full">
            <Checkbox defaultSelected name="remember" value="true" size="sm">
              {t("UI.checkboxes.remember_me")}
            </Checkbox>
            <Link
              href="/reset-password"
              className="hover:opacity-80 min-w-max font-medium text-primary text-sm hover:underline transition-all"
            >
              {t("UI.redirects.forgot_password")}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Button className="w-full" color="primary" type="submit">
            {t("UI.buttons.enter")}
          </Button>
          <p className="text-small text-center">
            <Link
              href={{
                pathname: "/sign-up",
                query: {
                  email: email,
                },
              }}
              className="hover:opacity-80 font-medium text-primary text-sm hover:underline transition-all"
            >
              {t("UI.redirects.create_account")}
            </Link>
          </p>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
