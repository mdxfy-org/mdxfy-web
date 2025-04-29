import { PressEvent } from "@heroui/react";
import Button, { ButtonProps } from "../button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../modal";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export interface ConfirmActionModalMessages {
  actionConfirmTitle?: string;
  actionConfirmButton?: string;
  actionCancelButton?: string;
  actionConfirmButtonColor?: ButtonProps["color"];
  actionConfirmText?: string;
  actionConfirmHeaderClassName?: string;
  actionConfirmBodyClassName?: string;
  actionConfirmFooterClassName?: string;
  onConfirmModalChanged?: (isOpen: boolean) => void;
}

export interface ConfirmActionModalProps extends ConfirmActionModalMessages {
  isOpen: boolean;
  onClose: () => void;
  onClick?: (e: PressEvent) => void;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  onClose,
  onClick,
  actionConfirmTitle,
  actionConfirmText,
  actionConfirmButton,
  actionCancelButton,
  actionConfirmButtonColor,
  actionConfirmHeaderClassName,
  actionConfirmBodyClassName,
  actionConfirmFooterClassName,
  onConfirmModalChanged,
}) => {
  const t = useTranslations();
  // const targetRef = useRef<HTMLElement>(null!);
  // const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  useEffect(() => {
    onConfirmModalChanged?.(isOpen);
  }, [isOpen, onConfirmModalChanged]);

  return (
    <Modal
      // ref={targetRef}
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <ModalContent
        draggable
        className="m-1 md:m-0 max-h-[calc(100vh-8px)] md:max-h-[calc(100vh-4rem)]"
      >
        {(onClose) => (
          <>
            <ModalHeader
              // {...moveProps}
              className={actionConfirmHeaderClassName}
            >
              {actionConfirmTitle ?? t("UI.titles.action_confirm")}
            </ModalHeader>
            <ModalBody className={actionConfirmBodyClassName}>
              {actionConfirmText ?? t("UI.titles.action_confirm_text")}
            </ModalBody>
            <ModalFooter className={actionConfirmFooterClassName}>
              <Button onPress={onClose}>
                {actionCancelButton ?? t("UI.buttons.cancel")}
              </Button>
              <Button
                onPress={(e) => {
                  onClick?.(e);
                  onClose();
                }}
                color={actionConfirmButtonColor}
              >
                {actionConfirmButton ?? t("UI.buttons.continue")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmActionModal;
