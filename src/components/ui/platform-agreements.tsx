import { ModalBody, ModalHeader } from "@heroui/react";
import { useTranslations } from "next-intl";
import ScrollShadow from "../scroll-shadow";
import Link from "@/components/link";
import { getLegalUrl } from "@/lib/utils";

export const TermsOfUse = () => {
  const t = useTranslations();

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        {t("Legal.agreements.terms_of_use")}
      </ModalHeader>
      <ModalBody className="p-0 overflow-y-auto">
        <ScrollShadow className="flex flex-col gap-4 mr-2 px-6 py-2 pr-4">
          <p>{t("Legal.agreements.terms_of_use_info_1")}</p>
          <p>{t("Legal.agreements.terms_of_use_info_2")}</p>
          <p>
            {t.rich("Legal.agreements.terms_of_use_info_3", {
              link: (chunks) => (
                <Link
                  href={`${getLegalUrl()}/terms-of-use`}
                  className="hover:opacity-80 font-medium text-primary hover:underline transition-all cursor-pointer"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </ScrollShadow>
      </ModalBody>
    </>
  );
};

export const PrivacyPolicy = () => {
  const t = useTranslations();

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        {t("Legal.agreements.privacy_policy")}
      </ModalHeader>
      <ModalBody className="p-0 overflow-y-auto">
        <ScrollShadow className="flex flex-col gap-4 mr-2 px-6 py-2 pr-4">
          <p>{t("Legal.agreements.privacy_policy_info_1")}</p>
          <p>{t("Legal.agreements.privacy_policy_info_2")}</p>
          <p>
            {t.rich("Legal.agreements.privacy_policy_info_3", {
              link: (chunks) => (
                <Link
                  href={`${getLegalUrl()}/privacy-policies`}
                  className="hover:opacity-80 font-medium text-primary hover:underline transition-all cursor-pointer"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </ScrollShadow>
      </ModalBody>
    </>
  );
};
