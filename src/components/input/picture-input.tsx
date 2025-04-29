import { Image as HeroUIImage, useDisclosure } from "@heroui/react";
// import Img from "./image";
import imageDefault from "@public/img/image-default.png";
import Cropper, { Area } from "react-easy-crop";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "../form";
import { useTranslations } from "next-intl";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/modal";
import Button from "../button";
import { useGroup } from "./group/input-group";
import { Upload } from "@solar-icons/react";

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
  cropAspect?: number;
  onSubmit?: (file: FormData) => void | Promise<unknown>;
  onSuccess?: (options: ReturnType<typeof useDisclosure>) => void;
  onError?: () => void;
  onFinally?: (options: ReturnType<typeof useDisclosure>) => void;
}

const PictureInput: React.FC<PictureInputProps> = ({
  imageSrc,
  fallbackSrc,
  name: inputName,
  label,
  cropAspect = 1,
  onSubmit,
  onSuccess,
  onError,
  onFinally,
}) => {
  const t = useTranslations();
  const form = useForm();
  const group = useGroup();
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = disclosure;

  const name = inputName && group ? group.getFieldName(inputName) : inputName;

  const [value, setValue] = useState<string | undefined>(imageSrc);
  const [error, setError] = useState<string | undefined>();

  const [image, setImage] = useState<string | undefined>(value);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const [imageCrop, setImageCrop] = useState<Area | undefined>();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const changeValue = useCallback(
    (newValue?: string) => {
      if (newValue && newValue !== value) {
        setValue(newValue);
        if (name && form) {
          form.setValue(name, newValue);
          form.setError(name, undefined);
        }
      }
    },
    [name, form, value]
  );

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setImageCrop(croppedAreaPixels);
  };

  const savePicture = async () => {
    if (image && imageCrop) {
      const img = new Image();
      img.crossOrigin = "anonymous";
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
    changeValue(value);
  }, [value, changeValue]);

  useEffect(() => {
    if (name && form?.values[name] && form?.values[name] !== value) {
      setValue(form.values?.[name]);
    }
  }, [value, form?.values, name]);

  useEffect(() => {
    if (name && form?.errors[name]) {
      setError(
        Array.isArray(form.errors[name])
          ? form.errors[name].join(", ")
          : form.errors[name]
      );
    }
  }, [form?.errors, name]);

  useEffect(() => {
    if (name && form && form.values?.[name]) {
      setImage(form.values?.[name]);
    }
  }, [value, form, name, setImage]);

  useEffect(() => {
    if (group && inputName) {
      group.declareField(inputName, {
        type: "text",
        required: false,
      });
    }
  }, [inputName, group]);

  return (
    <div className="flex flex-row flex-1 justify-center gap-4 w-full">
      <div className="flex flex-col flex-1 items-center gap-4 max-w-md">
        <div className="max-w-48">
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>{label}</ModalHeader>
                  <ModalBody>
                    <div className="relative rounded-xl w-full aspect-square overflow-hidden">
                      {!image || !imageLoaded ? (
                        <HeroUIImage
                          src={imageDefault.src}
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
                                  setImageLoaded(true);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                            e.target.value = "";
                          }}
                        />
                        <Upload className="text-gray-700 dark:text-gray-200" />
                      </label>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="default" onPress={onClose}>
                      {t("UI.buttons.cancel")}
                    </Button>
                    <Button color="success" onPress={savePicture}>
                      {t("UI.buttons.enter")}
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
          <div className="shadow-sm border-2 border-default-200 hover:border-default-400 rounded-xl overflow-hidden !transition-all !duration-100">
            <HeroUIImage
              src={value}
              fallbackSrc={fallbackSrc || imageDefault.src || ""}
              onLoad={() => {
                setImageLoaded(true);
              }}
              classNames={{
                wrapper: "bg-contain",
              }}
              radius="none"
              className={cn(
                "bg-gray-100 dark:bg-gray-500/75 min-w-8 min-h-8 object-cover aspect-square cursor-pointer"
              )}
              width={192}
              height={192}
              alt="Avatar"
              onClick={onOpen}
            />
          </div>
          {error && (
            <p
              className="-bottom-2 absolute p-1 max-w-full text-danger text-tiny text-start truncate"
              title={error}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PictureInput;
