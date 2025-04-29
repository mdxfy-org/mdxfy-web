import { AxiosError } from "axios";

export type Success<T = undefined> = T extends undefined
  ? {
      message: string;
      success: boolean;
    }
  : {
      message: string;
      success: boolean;
    } & T;

export type Error<T = undefined> = (T extends undefined
  ? {
      message: string;
      errors?: Record<string, string[]>;
      success: boolean;
    }
  : {
      message: string;
      errors?: Record<string, string[]>;
      success: boolean;
    } & T) &
  AxiosError;
