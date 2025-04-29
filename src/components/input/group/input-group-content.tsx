import {
  InputGroupProviderProps,
  useGroup,
} from "@/components/input/group/input-group";
import Button from "@/components/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/modal";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

export interface InputGroupContentProps {
  children?: React.ReactNode;
}

const InputGroupContent: React.FC<InputGroupContentProps> = ({ children }) => {
  const t = useTranslations();
  const inputGroup = useGroup();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) {
      setTimeout(() => {
        setMounted(true);
      }, 1);
    }
  }, [mounted]);

  if (!inputGroup) {
    return null;
  }

  const isEditing = inputGroup.edit !== undefined;

  const {
    disclosure: { isOpen, onOpen, onOpenChange, onClose: onCloseModal },
  } = inputGroup;

  const onClose = () => {
    if (isEditing) {
      inputGroup.handleEditCancel();
    }
    onCloseModal();
  };

  const transitionContent = {
    item: (
      (typeof inputGroup.label === "string"
        ? inputGroup.label
        : inputGroup.label?.default) ?? t("UI.input_group.item")
    ).toLowerCase(),
  };

  return (
    <>
      {!mounted && <div hidden>{children}</div>}
      {inputGroup.modal ? (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          placement="center"
        >
          <ModalContent>
            <ModalHeader>
              {inputGroup.messages[isEditing ? "edit" : "insert"].title}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>
                {inputGroup.messages[isEditing ? "edit" : "insert"].cancel}
              </Button>
              <Button
                confirmAction
                confirmActionInfo={{
                  actionConfirmButtonColor: "primary",
                  actionConfirmTitle: isEditing
                    ? t("UI.input_group.edit.title", transitionContent)
                    : t("UI.input_group.insert.title", transitionContent),
                  actionConfirmText: isEditing
                    ? t("UI.input_group.edit.description", transitionContent)
                    : t("UI.input_group.insert.description", transitionContent),
                }}
                color="primary"
                onPress={() => {
                  if (isEditing) {
                    inputGroup.handleEditConfirm();
                    return;
                  }
                  inputGroup.addNew();
                }}
              >
                {inputGroup.messages[isEditing ? "edit" : "insert"].confirm}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        children
      )}
      {(inputGroup.list ||
        (!inputGroup.list &&
          inputGroup.count - inputGroup.excluded.length <= 0)) && (
        <Button
          variant="flat"
          onPress={() => {
            onOpen();
          }}
          disabled={
            inputGroup.max &&
            inputGroup.count - inputGroup.excluded.length >= inputGroup.max
              ? true
              : false
          }
        >
          <RenderButtonText groupContext={inputGroup} />
        </Button>
      )}
    </>
  );
};

interface RenderButtonProps {
  groupContext: InputGroupProviderProps;
}

const RenderButtonText: React.FC<RenderButtonProps> = ({ groupContext }) => {
  const { count, excluded, buttonLabel, label } = groupContext;
  const groupTranslations = useTranslations("UI.input_group");
  const effectiveCount = count - excluded.length;

  const getButtonMessage = useMemo(() => {
    const candidate = buttonLabel || label;
    if (!candidate) return "";

    if (typeof candidate === "object") {
      const name =
        effectiveCount <= 1
          ? candidate.default.toLowerCase()
          : candidate.plural.toLowerCase();
      return groupTranslations("button", { name, count: effectiveCount });
    }

    if (buttonLabel) {
      return candidate.toLowerCase();
    }

    return groupTranslations("button", {
      name: candidate.toLowerCase(),
      count: effectiveCount,
    });
  }, [buttonLabel, label, effectiveCount, groupTranslations]);

  return <>{getButtonMessage}</>;
};

export default InputGroupContent;
