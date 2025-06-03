// PictureInput.tsx
import { Image as HeroUIImage } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
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
  onSuccess?: () => void;
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

  const [value, setValue] = useState<string | undefined>(imageSrc);
  const [error, setError] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>(value);

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
    [value, name, form]
  );

  const handleCropSave = (blob: Blob) => {
    const formData = new FormData();
    formData.append("image", blob, "profile_picture.png");
    onSubmit?.(formData)
      ?.then(() => {
        onSuccess?.();
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) setImage(e.target.result as string);
        };
        reader.readAsDataURL(blob);
      })
      .catch(() => {
        onError?.();
      })
      .finally(() => {
        onFinally?.();
      });
  };

  useEffect(() => {
    changeValue(value);
  }, [value, changeValue]);

  useEffect(() => {
    if (name && form?.values[name] && form.values[name] !== value) {
      setValue(form.values[name]);
    }
  }, [form, value, name]);

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
      setImage(form.values[name]);
    }
  }, [form, name]);

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
          <PictureCropModal
            label={label}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            initialImage={image}
            cropAspect={cropAspect}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSave={(blob: any) => handleCropSave(blob)}
            onCancel={() => {}}
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
              src={value}
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
