import {
  Button as HeroUIButton,
  ButtonProps as HeroUIButtonProps,
  useDisclosure,
} from "@heroui/react";
import { cn } from "@/lib/utils";
import ConfirmActionModal, {
  ConfirmActionModalMessages,
} from "./ux/confirm-action-modal";
import { useForm } from "./form";

export type HrefProps = {
  pathname: string;
  query?: Record<string, string | number>;
};

export interface ButtonProps extends HeroUIButtonProps {
  confirmAction?: boolean;
  confirmActionInfo?: ConfirmActionModalMessages;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  confirmAction = false,
  confirmActionInfo,
  disabled,
  disableAnimation,
  onPress,
  ...props
}: ButtonProps) => {
  const form = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const newProps = confirmAction
    ? {
        type: "button",
        onPress: onOpen,
      }
    : { onPress };

  return (
    <>
      {confirmAction && (
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={onClose}
          onClick={(e) => {
            onPress?.(e);
            if (type === "submit") {
              if (form) {
                const formElement = document.querySelector(
                  `#${form.formId}`
                ) as HTMLFormElement | null;
                formElement?.requestSubmit();
                return;
              }
              document.querySelector("form")?.requestSubmit();
            }
          }}
          {...confirmActionInfo}
        />
      )}
      <HeroUIButton
        {...props}
        {...newProps}
        disabled={disabled}
        className={cn(
          "px-8 duration-75",
          className,
          disabled && "opacity-80 cursor-not-allowed"
        )}
        disableAnimation={disableAnimation || disabled}
        type={confirmAction ? "button" : type}
      >
        {children}
      </HeroUIButton>
    </>
  );
};

export default Button;
