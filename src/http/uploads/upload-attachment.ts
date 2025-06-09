import api, { apiBaseUrl } from "@/service/api";
import { Success } from "@/types/api-response";
import { Attachment } from "@/types/attachment";

export type UploadAttachmentResponse = Success<{
  data: Attachment[];
}>;

export const uploadAttachment = (
  attachment: FormData
): Promise<UploadAttachmentResponse> => {
  return api
    .post("/uploads/attachments", attachment, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      baseURL: apiBaseUrl,
    })
    .then(({ data }) => data);
};
