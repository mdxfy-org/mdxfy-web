import { ModalProps } from "@heroui/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./modal";
import Button from "./button";

export interface ModalDialogueProps extends ModalProps {
  title?: string;
  action?: () => void;
  actionMessage?: string;
  dismissMessage?: string;
}

const ModalDialogue: React.FC<ModalDialogueProps> = ({
  title,
  action,
  actionMessage,
  dismissMessage,
  children,
  className,
  ...props
}) => {
  return (
    <Modal {...props}>
      <ModalContent>
        <ModalHeader>{title ?? "Alert"}</ModalHeader>
        <ModalBody className={className}>{children}</ModalBody>
        <ModalFooter className="flex-row-reverse">
          {action && (
            <Button onPress={action}>{actionMessage ?? "Action"}</Button>
          )}
          <Button>{dismissMessage ?? "Dismiss"}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDialogue;
