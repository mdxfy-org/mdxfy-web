import { Checkbox } from "@/components/input/checkbox";
import Form from "@/components/form/form";
import { Input } from "@/components/input/input";
import Link from "@/components/link";
import { PrivacyPolicy, TermsOfUse } from "@/components/ui/platform-agreements";
import { useUser } from "@/contexts/auth-provider";
import { useOverlay } from "@/contexts/overlay-provider";
import { signUp } from "@/http/user/sign-up";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  Spacer,
  useDisclosure,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { JSX, useState } from "react";
import { FormValues } from "@/types/form";

const SignInForm: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const { setIsLoading } = useOverlay();
  const { setUser, setToken } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modalContent, setModalContent] = useState<JSX.Element | undefined>();

  const openTermsOfUse = () => {
    setModalContent(<TermsOfUse />);
    onOpen();
  };

  const openPrivacyPolicy = () => {
    setModalContent(<PrivacyPolicy />);
    onOpen();
  };

  const handleSubmit = (data: FormValues) => {
    setIsLoading(true);
    setLoading(true);
    signUp(data)
      .then(({ user, token }) => {
        setUser(user);
        setToken(token);
        router.push(`/auth-code`);
      })
      .catch(({ data: error }) => {
        setErrors(error.errors);
        setIsLoading(false);
        setLoading(false);
      });
  };

  return (
    <>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        size="2xl"
        onClose={onClose}
        placement="center"
      >
        <ModalContent className="m-1 md:m-0 max-h-[calc(100vh-8px)] md:max-h-[calc(100vh-4rem)]">
          {(onClose) => (
            <>
              {modalContent}
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  {t("UI.buttons.understood")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Form
        className="flex flex-col flex-1 md:flex-none items-center gap-4"
        onSubmit={handleSubmit}
        validationErrors={errors}
      >
        <div className="flex flex-col gap-4 w-full">
          <Input
            name="name"
            label={t("UI.labels.name")}
            placeholder={t("UI.placeholders.write_name")}
            type="name"
            autoCapitalize="words"
            isRequired
          />
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
            name="password"
            label={t("UI.labels.password")}
            placeholder={t("UI.placeholders.write_password")}
            type="password"
            taggableVisibility
            isRequired
          />
          <Input
            name="password_confirm"
            label={t("UI.labels.password_confirm")}
            placeholder={t("UI.placeholders.write_password_confirm")}
            type="password"
            isRequired
          />
          <div>
            <Checkbox defaultSelected name="remember" value="true" size="sm">
              {t("UI.checkboxes.remember_me")}
            </Checkbox>
            <Checkbox name="terms_and_privacy_agreement" value="true" size="sm">
              <>
                {t.rich("Legal.agreements.accept_policy_and_terms", {
                  use: (chunks) => (
                    <span
                      onClick={() => {
                        openTermsOfUse();
                      }}
                      className="hover:opacity-80 font-medium text-primary text-sm hover:underline transition-all cursor-pointer"
                    >
                      {chunks}
                    </span>
                  ),
                  privacy: (chunks) => (
                    <span
                      onClick={() => {
                        openPrivacyPolicy();
                      }}
                      className="hover:opacity-80 font-medium text-primary text-sm hover:underline transition-all cursor-pointer"
                    >
                      {chunks}
                    </span>
                  ),
                })}
              </>
            </Checkbox>
          </div>
          <input type="hidden" name="language" value={router.locale} />
        </div>
        <Spacer y={4} />
        <div className="flex flex-col flex-1 md:flex-none justify-end gap-4 w-full">
          {/* <p className="text-gray-700 dark:text-gray-200 text-small text-start">
            {t("Legal.agreements.sign_in_terms")}
          </p> */}
          <Button
            className="w-full"
            color="primary"
            type="submit"
            isLoading={isLoading}
          >
            {t("UI.buttons.continue")}
          </Button>
          <p className="text-small text-center">
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
          </p>
        </div>
      </Form>
    </>
  );
};

export default SignInForm;
