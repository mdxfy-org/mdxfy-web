import { addToast } from "@heroui/react";
import { useTranslations } from "next-intl";

interface ToastParams {
  title?: string;
  description: string;
}

interface Toast {
  success: (params: ToastParams) => void;
  error: (params: ToastParams) => void;
  warning: (params: ToastParams) => void;
  info: (params: ToastParams) => void;
}

export const useToast = (): Toast => {
  const t = useTranslations("Messages.titles");

  const success = ({ title, description }: ToastParams) => {
    addToast({
      title: title || t("success"),
      description,
      color: "success",
    });
  };

  const error = ({ title, description }: ToastParams) => {
    addToast({
      title: title || t("error"),
      description,
      color: "danger",
    });
  };

  const warning = ({ title, description }: ToastParams) => {
    addToast({
      title: title || t("warning"),
      description,
      color: "warning",
    });
  };

  const info = ({ title, description }: ToastParams) => {
    addToast({
      title: title || t("info"),
      description,
      color: "secondary",
    });
  };

  return { success, error, warning, info };
};
