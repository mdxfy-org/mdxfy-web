import api from "@/service/api";
import { Success } from "@/types/api-response";

type GetFingerprintResponse = Success<{ fingerprint: string }>;

export const getFingerprint = () => {
  return api.get<GetFingerprintResponse>("/fingerprint");
};
