import { Upload } from "@solar-icons/react";
import { useEffect, useState, useMemo } from "react";
import { useForm } from "../form/form";
import { useGroup } from "./group/input-group";
import { Button, cn, Spinner, useDisclosure } from "@heroui/react";
import ModalDialogue from "../modal-dialogue";
import { useRouter } from "next/router";
import { uploadAttachment } from "@/http/uploads/upload-attachment";
import { Attachment } from "@/types/attachment";
import { FileList } from "../file-list";
import { useSessionStorage } from "@/hooks/use-session-storage";

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
  onUpload?: (files: Attachment[]) => void;
}

const STORAGE_KEY = (formId: string, fieldName: string) =>
  `file-upload:${formId}:${fieldName}`;

export const FileUpload: React.FC<FileUploadProps> = ({
  name: inputName,
  label,
  placeholder,
  disabled = false,
  required = false,
  type = "replace",
  accept,
  multiple = false,
  onUpload,
}) => {
  const router = useRouter();
  // const toast = useToast();
  // const t = useTranslations();
  const disclosure = useDisclosure();
  const { onOpen } = disclosure;

  const form = useForm();
  const group = useGroup();
  const fieldName =
    inputName && group ? group.getFieldName(inputName) : inputName!;

  const storageKey = useMemo(
    () => STORAGE_KEY(router.pathname, fieldName),
    [router.pathname, fieldName]
  );

  const [files, setFiles] = useState<Attachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [sessionFiles, setSessionFiles] = useSessionStorage<Attachment[]>(
    storageKey,
    []
  );

  useEffect(() => {
    if (!form) return;
    if (sessionFiles && sessionFiles.length) {
      const uuids = sessionFiles.map((entry: Attachment) => entry.uuid);
      if (JSON.stringify(form.values?.[fieldName]) !== JSON.stringify(uuids)) {
        setFiles(sessionFiles);
        form?.setValue(fieldName, uuids);
      }
    }
  }, [sessionFiles, fieldName, form]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    if (!selected.length) return;

    setIsUploading(true);
    try {
      const attachment = new FormData();
      if (multiple) {
        selected.forEach((file) => attachment.append("files[]", file));
      } else {
        attachment.append("file", selected[0]);
      }

      uploadAttachment(attachment).then(({ data }) => {
        const uploaded: Attachment[] = data.map((entry: Attachment) => ({
          ...entry,
        }));
        const uuids: Attachment["uuid"][] = data.map(
          (entry: Attachment) => entry.uuid
        );

        const updated = type === "append" ? [...files, ...uploaded] : uploaded;

        setFiles(updated);
        form?.setValue(fieldName, uuids);

        setSessionFiles(updated);
        onUpload?.(updated);

        // toast.success({
        //   description: t("Messages.success.files_successfully_uploaded"),
        // });
      });
    } catch (error) {
      console.log(error);

      // toast.error({
      //   description: t("Messages.errors.failed_on_file_upload"),
      // });
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const fileNames = files.map((f) => f.name).join(", ");

  return (
    <div className="relative flex flex-col pt-6">
      <ModalDialogue title="Arquivos" {...disclosure}>
        <FileList files={files} />
      </ModalDialogue>

      <span className="top-0 z-20 absolute flex justify-between w-full text-foreground text-small">
        <p>{label ?? placeholder ?? "Upload a file"}</p>
        <Button
          className={cn(
            "bg-default-200 !min-w-5 !max-w-5 !size-5 text-default-600",
            files.length ? "" : "opacity-0"
          )}
          onPress={onOpen}
          isDisabled={!files.length}
          isIconOnly
        >
          i
        </Button>
      </span>

      <Button
        as="label"
        htmlFor={fieldName}
        className="inline-flex justify-center items-center gap-2 bg-default-200 px-4 py-2 rounded-medium w-full text-default-600 cursor-pointer"
        isDisabled={disabled || isUploading}
      >
        {isUploading ? <Spinner size="sm" /> : <Upload weight="LineDuotone" />}
        {isUploading
          ? "Carregando..."
          : files.length
          ? "Adicionar mais"
          : placeholder ?? label ?? "Selecionar arquivo"}
        <input
          id={fieldName}
          name={fieldName}
          type="file"
          accept={accept?.join(",")}
          className="hidden"
          multiple={multiple}
          disabled={disabled || isUploading}
          required={required}
          onChange={handleUpload}
        />
      </Button>

      {files.length > 0 && (
        <span
          className="mt-1 text-default-600 text-xs truncate"
          title={fileNames}
        >
          {fileNames}
        </span>
      )}
    </div>
  );
};
