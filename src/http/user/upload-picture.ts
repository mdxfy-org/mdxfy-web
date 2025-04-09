import api from "@/service/api";
import { Success } from "@/types/api-response";
import { User } from "@/types/user";

export type UploadPictureResponse = Success<{
  token: string;
  user: User;
}>;

export const uploadPicture = async (
  picture: FormData
): Promise<UploadPictureResponse> => {
  return api
    .post("/user/picture/upload", picture, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};
