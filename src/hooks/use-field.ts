import { useState, useEffect, useCallback } from "react";
import { FormProviderProps, useForm } from "../components/form/form";
import {
  InputGroupProviderProps,
  useGroup,
} from "../components/input/group/input-group";
import { NextRouter, useRouter } from "next/router";
import { DatePickerProps } from "@heroui/react";
import { parseDate } from "@internationalized/date";

export interface UseFieldOptions<T> {
  initialValue?: T;
  onChange?: (value: T) => void;
  updateInputValue?: (value: string) => void;
  required?: boolean;
  type?: string;
  validate?: (value: T) => string | null;
  format?: (
    value: string,
    info: {
      form?: FormProviderProps;
      group?: InputGroupProviderProps;
    }
  ) => string;
  queryCollectable?: T extends string | number | DatePickerProps["value"]
    ? boolean
    : false;
  queryCollectFunction?: ({
    name,
    router,
  }: {
    name: string;
    router: NextRouter;
  }) => T | void;
}

export interface UseFieldResult<T> {
  name: string | undefined;
  value: T;
  error: string | undefined;
  validate?: (value: T) => string | null;
  onChange: (newValue: T) => void;
  setError: (error?: string) => void;
  hasFirstRender: boolean;
}

export function useField<T = string>(
  inputName: string | undefined,
  options: UseFieldOptions<T> = {}
): UseFieldResult<T> {
  const router = useRouter();
  const form = useForm();
  const group = useGroup();

  const name = inputName && group ? group.getFieldName(inputName) : inputName;

  const initialValue =
    options.initialValue ??
    (name && form?.values ? (form.values[name] as T) : ("" as unknown as T));

  const [value, setValue] = useState<T>(initialValue);
  const [error, setErrorState] = useState<string | undefined>();
  const [hasFirstRender, setHasFirstRender] = useState(false);

  useEffect(() => {
    if (group && inputName) {
      group.declareField(inputName, {
        type: options.type ?? "text",
        required: options.required ?? false,
      });
    }
  }, [group, inputName, options.type, options.required]);

  useEffect(() => {
    if (!name || !form) return;

    const raw = form.values[name];
    if (raw === undefined) return;
    if (options.type === "date") {
      const dateStr =
        typeof raw === "string" && raw.includes("T") ? raw.split("T")[0] : raw;
      let parsed;
      try {
        parsed = parseDate(dateStr);
      } catch {
        parsed = undefined;
      }
      const current = value as unknown as ReturnType<typeof parseDate>;

      if (
        !current ||
        current.year !== parsed?.year ||
        current.month !== parsed?.month ||
        current.day !== parsed?.day
      ) {
        setValue(parsed as T);
      }
      return;
    }

    if (
      ["select", "select-multiple", "autocomplete"].includes(options.type ?? "")
    ) {
      if (options.type === "autocomplete" && options.updateInputValue) {
        options.updateInputValue(raw);
      }

      const changed = Array.isArray(raw)
        ? Array.isArray(value)
          ? raw.join("|") !== (value as unknown as string[]).join("|")
          : true
        : value !== raw;
      if (changed) {
        setValue(raw);
      }
      return;
    }

    if (value !== raw) {
      setValue(raw);
    }
  }, [options, name, form, value]);

  const onChange = useCallback(
    (newValue: T) => {
      const valueToUse =
        options.format && typeof newValue === "string"
          ? (options.format(newValue, { form, group }) as unknown as T)
          : newValue;

      setValue(valueToUse);
      if (name && form) {
        form.setValue(name, valueToUse);
        form.setError(name, undefined);
      }

      if (options.validate) {
        const errMsg = options.validate(valueToUse);
        setErrorState(errMsg || undefined);
        if (name && form) {
          form.setError(name, errMsg || undefined);
        }
      }

      if (options.onChange) {
        options.onChange(valueToUse);
      }
    },
    [name, form, options, group]
  );

  const setError = useCallback(
    (errorMsg?: string) => {
      setErrorState(errorMsg);
      if (name && form) {
        form.setError(name, errorMsg);
      }
    },
    [name, form]
  );

  useEffect(() => {
    if (!router.isReady) return;
    if (options.queryCollectable && name && !hasFirstRender) {
      if (options.queryCollectFunction) {
        const res = options.queryCollectFunction({ name, router });
        if (res !== undefined) {
          setValue(res);
        }
      } else {
        const queryValue = router.query[name];
        if (queryValue !== undefined) {
          setValue(queryValue as T);
        }
      }
      setHasFirstRender(true);
    }
  }, [router.isReady, options, name, hasFirstRender, onChange, router]);

  return {
    name,
    value,
    error,
    onChange,
    validate: options.validate,
    setError,
    hasFirstRender,
  };
}
