import { Image as HeroUIImage } from "@heroui/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "../form/form";
import { useGroup } from "./group/input-group";
import imageDefault from "@public/img/image-default.png";
import { useDisclosure } from "@heroui/react";
import { PictureCropModal } from "./picture-crop-modal";

export type PictureInputMessages = "label";

interface PictureInputProps {
  imageSrc?: string;
  fallbackSrc?: string;
  name?: string;
  label?: string;
  validationError?: string;
  cropAspect?: number;
  onSubmit?: (file: FormData) => void | Promise<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void;
  onError?: () => void;
  onFinally?: () => void;
  messages?: Record<PictureInputMessages, string>;
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
  const form = useForm();
  const group = useGroup();
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = disclosure;

  const name = inputName && group ? group.getFieldName(inputName) : inputName;

  const [loading, setLoading] = useState<boolean>(false);

  const [src, setSrc] = useState<string | undefined>(imageSrc);

  useEffect(() => {
    if (imageSrc && imageSrc !== src) {
      setSrc(imageSrc);
      if (name && form) {
        form.setValue(name, imageSrc);
        form.setError(name, undefined);
      }
    }
  }, [imageSrc, src, name, form]);

  useEffect(() => {
    if (group && inputName) {
      group.declareField(inputName, {
        type: "text",
        required: false,
      });
    }
  }, [inputName, group]);

  const handleCropSave = (blob: Blob) => {
    const formData = new FormData();
    formData.append("image", blob, "profile_picture.png");

    setLoading(true);
    onSubmit?.(formData)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.then(({ data }: any) => {
        onSuccess?.(data);

        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const dataUrl = e.target.result as string;
            setSrc(dataUrl);

            if (name && form) {
              form.setValue(name, dataUrl);
              form.setError(name, undefined);
            }
          }
        };
        reader.readAsDataURL(blob);
      })
      .catch(() => {
        onError?.();
      })
      .finally(() => {
        onFinally?.();
        setLoading(false);
      });
  };

  const error =
    name && form?.errors[name]
      ? Array.isArray(form.errors[name])
        ? form.errors[name].join(", ")
        : form.errors[name]
      : undefined;

  return (
    <div className="flex flex-row flex-1 justify-center gap-4 w-full">
      <div className="flex flex-col flex-1 items-center gap-4 max-w-md">
        <div className="max-w-48">
          <PictureCropModal
            label={label}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            initialImage={src}
            cropAspect={cropAspect}
            onSave={handleCropSave}
            onCancel={() => {}}
            loading={loading}
          />

          {label && (
            <label
              htmlFor={name}
              className="flex-shrink-0 max-w-full text-gray-700 dark:text-gray-200 text-small pointer-events-none"
            >
              {label}
            </label>
          )}

          <div className="shadow-sm border-2 border-default-200 hover:border-default-400 rounded-xl overflow-hidden !transition-all !duration-100">
            <HeroUIImage
              src={src}
              fallbackSrc={fallbackSrc || imageDefault.src}
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
