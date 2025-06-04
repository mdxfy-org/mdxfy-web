import { cn } from "@/lib/utils";
import React, { JSX, useEffect, useState } from "react";
import { useDisclosure } from "@heroui/react";
import ConfirmActionModal, {
  ConfirmActionModalMessages,
} from "../ux/confirm-action-modal";
import { formatLink, HrefProps } from "../link";
import { useRouter } from "next/router";

export interface IconOptionProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  href?: string | HrefProps;
  confirmAction?: boolean;
  confirmActionInfo?: ConfirmActionModalMessages;
  disabled?: boolean;
  onClick?: () => void;
}

const IconOption: React.FC<IconOptionProps> = ({
  icon,
  href,
  className,
  children,
  confirmAction = false,
  confirmActionInfo,
  disabled = false,
  onClick,
  ...props
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formattedHref, setFormattedHref] = useState<string | undefined>(
    undefined
  );

  const newProps = confirmAction
    ? {
        onClick: () => {
          if (disabled) return;
          onOpen();
        },
      }
    : {
        onClick: () => {
          if (disabled) return;
          onClick?.();
          if (formattedHref) {
            router.push(formattedHref);
          }
        },
      };

  useEffect(() => {
    if (href !== undefined) {
      if (typeof href === "string") {
        setFormattedHref(href);
      } else {
        setFormattedHref(formatLink(href));
      }
    }
  }, [href]);

  return (
    <>
      {confirmAction && (
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={onClose}
          onClick={onClick}
          {...confirmActionInfo}
        />
      )}
      <button
        className={cn(
          "flex flex-row items-center gap-1.5 bg-default-100 bg-opacity-0 hover:bg-opacity-75 p-1 rounded-md w-full text-gray-700 dark:text-gray-200 duration-75 cursor-pointer",
          "focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-1 -outline-offset-1",
          className,
          disabled ? "opacity-60" : "opacity-100"
        )}
        {...props}
        {...newProps}
      >
        {icon && (
          <span className="flex justify-center items-center w-4 h-4 font-medium text-gray-700 dark:text-gray-200">
            {icon}
          </span>
        )}
        {children}
      </button>
    </>
  );
};

export default IconOption;
