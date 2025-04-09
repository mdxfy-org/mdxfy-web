import { useAuth } from "@/contexts/auth-provider";
import { useLanguage } from "@/contexts/language-provider";
import { useOverlay } from "@/contexts/overlay-provider";
import { cn } from "@/lib/utils";
import { Button, Form, Skeleton, Spacer } from "@heroui/react";
import { useTranslations } from "next-intl";
import Link from "@/components/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuthCodeLength } from "@/http/get-auth-code-length";
import { auth, AuthError } from "@/http/user/auth";
import { useToast } from "@/service/toast";
import { useCountdown } from "@/lib/useCountdown";
import { resendCode } from "@/http/user/resend-code";
import { AxiosError } from "axios";
import InputOtp from "@/components/input-otp";
import { useCookies } from "react-cookie";
import { AUTHENTICATED_KEY } from "@/middleware";

const TIMEOUT = 60;

const AuthCodeForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const toast = useToast();

  const [, setCookie] = useCookies([AUTHENTICATED_KEY]);

  const { translateResponse } = useLanguage();
  const { setIsLoading } = useOverlay();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { user, setUser, setToken, logout } = useAuth();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [timer, setTimer] = useCountdown(TIMEOUT);

  const { data: codeLength, isLoading: codeLengthLoading } = useQuery<number>({
    queryKey: ["auth-code-length"],
    queryFn: async () => {
      const res = await getAuthCodeLength();
      return res.data.length ?? 6;
    },
  });

  const handleResendCode = async () => {
    if (timer <= 0) {
      setIsLoading(true);
      resendCode()
        .then(() => {
          toast.success({
            description: t("Messages.success.authentication_code_resent"),
          });
          setTimer(TIMEOUT);
        })
        .catch(() => {
          toast.error({
            description: t("Messages.errors.default"),
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.warning({
        description: t("Messages.info.wait_resend_code_timeout", {
          seconds: timer,
        }),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    setIsLoading(true);
    auth(String(formData["code"]))
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        setCookie(AUTHENTICATED_KEY, "true");
        router.push("/");
      })
      .catch(({ response, status }: AxiosError<AuthError>) => {
        if (status === 401) {
          toast.error({
            description: t(
              "Messages.errors.authentication_code_attempts_exceeded"
            ),
          });
          logout();
          return;
        }
        if (response?.data?.data?.attempts) {
          const params = {
            attempts_left: response?.data?.data?.attempts?.toString() || "0",
          };
          const errors = translateResponse(response?.data.errors ?? {}, params);
          toast.error({
            description: t(
              "Messages.errors.authentication_code_attempts",
              params
            ),
          });
          setErrors(errors);
          return;
        }
        toast.error({
          description: t("Messages.errors.default"),
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      setIsDataLoading(true);
      return;
    }
    setIsDataLoading(false);
  }, [user]);

  return (
    <>
      <Skeleton
        className="inline-block rounded-lg h-6"
        isLoaded={isDataLoading}
      >
        <p className="pb-2 font-semibold text-gray-700 dark:text-gray-200 text-xl text-left">
          {t("UI.titles.welcome_again", { name: user?.name })}
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
      </Skeleton>
      <Form
        className="flex flex-col flex-1 md:flex-auto"
        validationBehavior="native"
        validationErrors={errors}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex flex-col items-center gap-1 rounded-lg w-full text-gray-700 dark:text-gray-200">
            <label
              htmlFor="code"
              className="text-[#12181c] dark:text-[#ecedee]"
            >
              {t("UI.placeholders.write_code")}
            </label>
            <Skeleton className="rounded-lg h-14" isLoaded={!codeLengthLoading && isDataLoading}>
              <InputOtp
                name="code"
                className="mb-2"
                variant="bordered"
                length={codeLength || 6}
                queryCollectable
              />
            </Skeleton>
          </div>
          <Skeleton
            className="inline-block rounded-lg"
            isLoaded={isDataLoading}
          >
            <p className="font-normal text-gray-700 dark:text-gray-200 text-small text-center">
              {t.rich("UI.info.email_verification_code_sent", {
                email: () => <span className="font-bold">{user?.email}</span>,
                action: () => (
                  <span
                    onClick={handleResendCode}
                    className={cn(
                      timer <= 0
                        ? "hover:underline cursor-pointer text-primary"
                        : "text-neutral-600 dark:text-neutral-400 cursor-not-allowed"
                    )}
                  >
                    {t("UI.buttons.resend_code")}
                    {timer <= 0 ? "" : `(${timer})`}
                  </span>
                ),
              })}
            </p>
          </Skeleton>
          <Spacer y={16} />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Button className="w-full" color="primary" type="submit">
            {t("UI.buttons.continue")}
          </Button>
          <p className="w-full text-small text-center">
            <Link href="/login" onClick={logout}>
              {t("UI.redirects.enter_another_account")}
            </Link>
          </p>
        </div>
      </Form>
    </>
  );
};

export default AuthCodeForm;
