import { cn } from "@/lib/utils";
import { Upload } from "@solar-icons/react";
// import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "../form/form";
import { useGroup } from "./group/input-group";
import { Button, useDisclosure } from "@heroui/react";
import ModalDialogue from "../modal-dialogue";
import FileList from "../file-list";

export type FileAcceptedTypes =
  | "image/png"
  | "image/jpeg"
  | "image/webp"
  | "image/gif"
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export interface FileUploadProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: "append" | "replace";
  accept?: FileAcceptedTypes[];
  multiple?: boolean;
  onUpload?: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name: inputName,
  label,
  placeholder,
  disabled = false,
  required = false,
  type = "replace",
  accept,
  multiple,
  onUpload,
}) => {
  // const t = useTranslations();
  const disclosure = useDisclosure();
  const { onOpen } = disclosure;

  const [files, setFiles] = useState<File[] | undefined>();

  const form = useForm();
  const group = useGroup();

  const name = inputName && group ? group.getFieldName(inputName) : inputName;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    let updatedFiles: File[] = [];

    if (type === "replace") {
      updatedFiles = selectedFiles;
    } else if (type === "append") {
      updatedFiles = [...(files ?? []), ...selectedFiles];
    }

    setFiles(updatedFiles);
    onUpload?.(updatedFiles);
  };

  useEffect(() => {
    if (form && form.getters[name]) return;
    if (name && form) {
      form.setGetter(name, () => files);
      form.setValue(name, files);
    }
  }, [form, name, files]);

  const fileNames = files?.map((file) => file.name).join(", ");

  return (
    <div className="relative flex flex-col pt-6">
      <ModalDialogue title="Arquivos" {...disclosure}>
        <FileList files={files} />
      </ModalDialogue>
      <span className="top-0 z-20 absolute flex justify-between w-full text-foreground text-small transition-[transform,color,left,opacity]">
        <p>{label ?? placeholder ?? "Upload a file"}</p>
        <Button
          className={cn(
            "!min-w-5 !max-w-5 !size-5",
            files && files?.length > 0 ? "opacity-100" : " opacity-0"
          )}
          onPress={onOpen}
          isDisabled={!files || files?.length === 0}
          isIconOnly
        >
          i
        </Button>
      </span>
      <Button
        as={"label"}
        htmlFor={name}
        className={cn(
          "inline-flex justify-center items-center gap-4 px-4 rounded-medium w-full min-w-20 h-10 text-sm duration-75 cursor-pointer"
        )}
      >
        {placeholder ?? label ?? "Input a file"}
        {/* {files
          ? t("UI.buttons.choose_another_photo")
          : t("UI.buttons.choose_a_photo")} */}
        <input
          id={name}
          name={name}
          type="file"
          accept={accept?.join(", ")}
          tabIndex={-1}
          className="hidden"
          multiple={multiple}
          onChange={handleUpload}
          disabled={disabled}
          required={required}
        />
        <Upload className="text-gray-700 dark:text-gray-200" />
      </Button>
      {files && (
        <span className="text-xs truncate" title={fileNames}>
          {fileNames}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
