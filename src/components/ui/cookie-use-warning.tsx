import useLocalStorage from "@/lib/useLocalstorage";
import { useDisclosure } from "@heroui/react";
import { useTranslations } from "next-intl";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../modal";
import Button from "../button";

const COOKIE_NOTICE_KEY = "cookie_notice_accepted";

const CookieUseWarning: React.FC = () => {
  const t = useTranslations();
  const { onClose } = useDisclosure();
  const [noticeReceived, setNoticeReceived] = useLocalStorage<boolean>(
    COOKIE_NOTICE_KEY,
    false
  );

  const handleAccept = () => {
    setNoticeReceived(true);
    onClose();
  };

  return (
    <Modal isOpen={!noticeReceived} onClose={handleAccept}>
      <ModalContent>
        <ModalHeader>
          {t("Legal.agreements.cookie_use_warning_title")}
        </ModalHeader>
        <ModalBody>
          <p>{t("Legal.agreements.cookie_use_warning_description")}</p>
          <p>{t("Legal.agreements.cookie_use_warning_disclaimer")}</p>
        </ModalBody>
        <ModalFooter className="justify-end">
          <Button color="primary" onPress={handleAccept}>
            {t("UI.buttons.understood")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CookieUseWarning;
