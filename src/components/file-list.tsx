import {
  CloseCircle,
  File,
  FileText,
  Gallery,
  Microphone2,
  VideoFramePlayHorizontal,
  ZipFile,
} from "@solar-icons/react";
import { Icon } from "@solar-icons/react/lib/types";
import React from "react";
import { Attachment } from "../types/attachment";

export interface FileListProps {
  files?: Attachment[];
}

export interface FileIconProps {
  file: Attachment;
}

const extensionIconMap: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  jpg: Gallery,
  jpeg: Gallery,
  png: Gallery,
  gif: Gallery,
  svg: Gallery,
  webp: Gallery,

  mp4: VideoFramePlayHorizontal,
  mov: VideoFramePlayHorizontal,

  mp3: Microphone2,
  wav: Microphone2,

  txt: FileText,
  md: FileText,
  json: FileText,
  xml: FileText,

  pdf: FileText,
  doc: FileText,
  docx: FileText,
  xls: FileText,
  xlsx: FileText,

  zip: ZipFile,
  rar: ZipFile,

  default: File,
};

export const FileIcon: React.FC<FileIconProps> = ({ file }) => {
  const ext = file.name.split(".").pop()?.toLowerCase() || "";

  const IconComponent = (extensionIconMap[ext] ||
    extensionIconMap["default"]) as Icon;

  return <IconComponent className="size-4" weight="LineDuotone" />;
};

const FileItem: React.FC<{ file: Attachment }> = ({ file }) => {
  return (
    <div className="relative flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center gap-1 max-w-[calc(100%-32px)]">
        <span>
          <FileIcon file={file} />
        </span>
        <p className="text-sm truncate">{file.name}</p>
      </div>
      <CloseCircle className="m-1 size-4" weight="LineDuotone" />
    </div>
  );
};

export const FileList: React.FC<FileListProps> = ({ files }) => {
  return (
    <div className="flex flex-col gap-1">
      {files?.map((file, index) => (
        <FileItem key={index} file={file} />
      ))}
    </div>
  );
};
