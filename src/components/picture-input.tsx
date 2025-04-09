import {
  Button,
  Image as HeroUIImage,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
// import Img from "./image";
import imageDefault from "@public/img/image-default.png";
import Cropper, { Area } from "react-easy-crop";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload04Icon } from "@hugeicons/react";
import { useForm } from "./form";
import { useTranslations } from "next-intl";

export type PictureInputMessages =
  | "modalTitle"
  | "modalDescription"
  | "modalButton";

interface PictureInputProps {
  imageSrc?: string;
  fallbackSrc?: string;
  name?: string;
  label?: string;
  validationError?: string;
  messages?: Record<PictureInputMessages, string>;
  onSubmit?: (file: FormData) => void | Promise<unknown>;
  onSuccess?: (options: ReturnType<typeof useDisclosure>) => void;
  onError?: () => void;
  onFinally?: (options: ReturnType<typeof useDisclosure>) => void;
}

const PictureInput: React.FC<PictureInputProps> = ({
  imageSrc,
  fallbackSrc,
  name,
  label,
  onSubmit,
  onSuccess,
  onError,
  onFinally,
}) => {
  const t = useTranslations();
  const form = useForm();
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = disclosure;

  const [error, setError] = useState<string | undefined>();

  const [image, setImage] = useState<string | undefined>(imageSrc);

  const [imageCrop, setImageCrop] = useState<Area | undefined>();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setImageCrop(croppedAreaPixels);
  };

  const savePicture = async () => {
    if (image && imageCrop) {
      const img = new Image();
      img.src = image;

      img.onload = async () => {
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

        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const formData = new FormData();
          formData.append("image", blob, "profile_picture.png");
          onSubmit?.(formData)
            ?.then(() => {
              onSuccess?.(disclosure);
            })
            .catch(() => {
              onError?.();
            })
            .finally(() => {
              onFinally?.(disclosure);
            });
        }, "image/png");
      };
    }
  };

  useEffect(() => {
    if (name && form?.errors[name]) {
      setError(
        Array.isArray(form.errors[name])
          ? form.errors[name].join(", ")
          : form.errors[name]
      );
    }
  }, [form?.errors, name]);

  return (
    <div className="max-w-48">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="pb-1 text-gray-700 dark:text-gray-200">
                {label}
              </ModalHeader>
              <ModalBody>
                <div className="relative h-96">
                  {!image ? (
                    <HeroUIImage
                      src={imageDefault.src}
                      className="absolute inset-0 !opacity- rounded-xl w-full h-full object-cover"
                      width={400}
                      height={384}
                      alt="Crop"
                    />
                  ) : (
                    <Cropper
                      image={image}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      objectFit="contain"
                    />
                  )}
                </div>
                <div>
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
                      accept="image/png, image/jpeg, image/webp"
                      tabIndex={0}
                      className="absolute inset-0 opacity-0 w-full h-full"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            if (e.target) {
                              setImage(e.target.result as string);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Upload04Icon className="text-gray-700 dark:text-gray-200" />
                  </label>
                </div>
              </ModalBody>
              <ModalFooter className="justify-between pt-1">
                <Button color="default" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={savePicture}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {label && (
        <label
          data-slot="label"
          htmlFor={name}
          className="flex-shrink-0 max-w-full text-gray-700 dark:text-gray-200 text-small pointer-events-none"
        >
          {label}
        </label>
      )}
      <HeroUIImage
        src={imageSrc || fallbackSrc || imageDefault.src || ""}
        className={cn(
          "!transition-all !duration-100",
          "bg-gray-100 dark:bg-gray-500/75 border-2 border-default-200 hover:border-default-400 rounded-xl min-w-8 min-h-8 object-cover aspect-square cursor-pointer"
        )}
        width={192}
        height={192}
        alt="Avatar"
        onClick={onOpen}
      />
      {error && (
        <p
          className="-bottom-2 absolute p-1 max-w-full text-danger text-tiny text-start truncate"
          title={error}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default PictureInput;
