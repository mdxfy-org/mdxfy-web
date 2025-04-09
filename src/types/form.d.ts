import type { ValidationErrors } from '@react-types/shared';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValue = FormDataEntryValue | any;

export type FormValues = Record<string, FormValue | FormValues>;

export type FormErrors = ValidationErrors;