import { useEffect, useState } from "react";
import { Modal, ModalContent } from "./modal";

export interface ConditionalModalProps {
  isOpen: boolean;
  onClose?: () => void;
  canClose?: boolean;
  children: React.ReactNode | ((onClose: () => void) => React.ReactNode);
}

const ConditionalModal: React.FC<ConditionalModalProps> = ({
  isOpen,
  onClose,
  canClose = true,
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

  const handleClose = () => {
    if (!canClose) return;
    setIsModalOpen(false);
    onClose?.();
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose} hideCloseButton={!canClose} placement="center">
      <ModalContent>
        {typeof children === "function" ? children(handleClose) : children}
      </ModalContent>
    </Modal>
  );
};

export default ConditionalModal;
