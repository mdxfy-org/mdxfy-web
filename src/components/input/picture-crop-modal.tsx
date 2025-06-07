import { Image as HeroUIImage } from "@heroui/react";
import Cropper, { Area } from "react-easy-crop";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import imageDefault from "@public/img/image-default.png";
import { useTranslations } from "next-intl";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/modal";
import Button from "../button";
import { Upload } from "@solar-icons/react";

interface PictureCropModalProps {
  label?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialImage?: string;
  cropAspect?: number;
  onSave: (blob: Blob) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const PictureCropModal: React.FC<PictureCropModalProps> = ({
  label,
  isOpen,
  onOpenChange,
  initialImage,
  cropAspect = 1,
  onSave,
  onCancel,
  loading,
}) => {
  const t = useTranslations();

  const [image, setImage] = useState<string | undefined>(initialImage);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageCrop, setImageCrop] = useState<Area | undefined>();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setImageCrop(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setImage(e.target.result as string);
        setImageLoaded(true);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const savePicture = () => {
    if (!image || !imageCrop) return;

    const isGif = image.startsWith("data:image/gif");

    if (isGif) {
      const byteString = atob(image.split(",")[1]);
      const mimeString = image.split(",")[0].split(":")[1].split(";")[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      onSave(blob);
      onOpenChange(false);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = imageCrop.width;
      canvas.height = imageCrop.height;
      ctx.drawImage(
        img,
        imageCrop.x,
        imageCrop.y,
        imageCrop.width,
        imageCrop.height,
        0,
        0,
        imageCrop.width,
        imageCrop.height
      );
      canvas.toBlob((blob) => {
        if (blob) {
          onSave(blob);
          onOpenChange(false);
        }
      }, "image/png");
    };
  };

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{label ?? t("UI.modal.crop_title")}</ModalHeader>
            <ModalBody>
              <div className="relative rounded-xl w-full aspect-square overflow-hidden">
                {!image || !imageLoaded ? (
                  <HeroUIImage
                    src={initialImage || imageDefault.src}
                    className="absolute inset-0 !opacity-60 w-full !h-[unset] object-cover"
                    width={416}
                    height={416}
                    alt="Crop"
                  />
                ) : (
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={cropAspect}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    objectFit="contain"
                  />
                )}
              </div>
              <label
                htmlFor="upload-picture"
                className={cn(
                  "inline-flex relative justify-center items-center gap-4 px-4 rounded-medium w-full min-w-20 h-10 text-sm duration-75 cursor-pointer",
                  "select-none overflow-hidden tap-highlight-transparent active:scale-[0.97] outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 transition-transform-colors-opacity bg-default text-default-foreground hover:opacity-hover"
                )}
              >
                {image
                  ? t("UI.buttons.choose_another_photo")
                  : t("UI.buttons.choose_a_photo")}
                <input
                  id="upload-picture"
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/gif"
                  tabIndex={0}
                  className="absolute inset-0 opacity-0 w-full h-full"
                  onChange={handleFileChange}
                />
                <Upload className="text-gray-700 dark:text-gray-200" />
              </label>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                onPress={() => {
                  onCancel?.();
                  onClose();
                }}
                disabled={loading}
              >
                {t("UI.buttons.cancel")}
              </Button>
              <Button
                color="success"
                onPress={savePicture}
                disabled={!imageCrop}
                isLoading={loading}
              >
                {t("UI.buttons.continue")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
