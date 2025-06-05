import { Button, useDisclosure } from "@heroui/react";
import ConditionalModal from "../conditional-modal";
import { ProfileUpdateForm } from "@/forms/profile-update-form";
import { Pen } from "@solar-icons/react";
import { AnimatePresence } from "framer-motion";

export const UserProfileUpdateModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <AnimatePresence>
        <Button
          onPress={onOpen}
          size="sm"
          radius="full"
          className="top-4 right-6 absolute bg-default-200 text-default-700"
        >
          <Pen size={16} />
          Editar
        </Button>
      </AnimatePresence>
      <ConditionalModal isOpen={isOpen} onClose={onClose}>
        <ProfileUpdateForm />
      </ConditionalModal>
    </>
  );
};
