import { DefaultError } from "@tanstack/react-query";

export type MutationError = {
  errors: Record<string, string>;
} & DefaultError;
