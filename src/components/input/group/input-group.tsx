import { FormProviderProps, useForm } from "@/components/form/form";
import { toNested } from "@/lib/nested";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@heroui/react";
import { useTranslations } from "next-intl";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ItemIndex = string | number | undefined;

export type Field = {
  type: string;
  required?: boolean;
  options?: string[];
};

export type Fields = Record<string, Field>;

export type MessagesSlots = "insert" | "edit" | "delete";
export type Messages = {
  title?: string;
  description?: string;
  cancel?: string;
  confirm?: string;
};

export type InputGroupCommons = {
  prefix: string;
  label?:
    | string
    | {
        default: string;
        plural: string;
      };
  buttonLabel?:
    | string
    | {
        default: string;
        plural: string;
      };
  error?: string;
  min?: number;
  max?: number;
  required?: boolean;
  description?: string;
  list?: boolean;
  modal?: boolean;

  messages?: Record<MessagesSlots, Messages>;
};

export interface InputGroupProps extends InputGroupCommons {
  children: React.ReactNode;
}

export interface InputGroupProviderProps extends InputGroupCommons {
  messages: Record<MessagesSlots, Messages>;

  disclosure: ReturnType<typeof useDisclosure>;

  count: number;
  edit: ItemIndex;
  index: ItemIndex;
  excluded: ItemIndex[];
  fields: Fields;
  identity: string | undefined;

  getFieldName: (field: string, index?: ItemIndex) => string;
  declareField: (field: string, info?: Field) => void;
  addNew: () => void;
  editItem: (item: ItemIndex) => void;
  handleEditCancel: () => void;
  handleEditConfirm: () => void;
  removeItem: (item: ItemIndex) => void;
}

const InputGroupProvider = createContext<InputGroupProviderProps | undefined>(
  undefined
);

const hiddenInputProps: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> = {
  hidden: true,
  "aria-hidden": "true",
  autoComplete: "off",
  autoCorrect: "off",
  spellCheck: "false",
  readOnly: true,
};

const InputGroup: React.FC<InputGroupProps> = ({
  prefix,
  label,
  buttonLabel,
  error,
  min,
  max,
  description,
  required,
  messages,
  list = false,
  modal = false,
  children,
}) => {
  if (min && max && min > max) {
    throw new Error("min cannot be greater than max");
  }
  const t = useTranslations();
  const groupTranslations = useTranslations("UI.input_group");
  const disclosure = useDisclosure();
  const { onOpen, onClose } = disclosure;
  const form = useForm();
  if (!form) {
    throw new Error("InputGroup must be used within a Form component");
  }

  const defaultLabel = (
    (typeof label === "string" ? label : label?.default) ??
    groupTranslations("item")
  ).toLowerCase();
  const defaultMessages: InputGroupProps["messages"] = {
    insert: {
      title:
        messages?.insert.title ??
        groupTranslations("insert.title", {
          item: defaultLabel,
        }),
      description:
        messages?.insert.description ??
        groupTranslations("insert.description", {
          item: defaultLabel,
        }),
      cancel: messages?.insert.cancel ?? groupTranslations("insert.cancel"),
      confirm: messages?.insert.confirm ?? groupTranslations("insert.confirm"),
    },
    edit: {
      title:
        messages?.edit.title ??
        groupTranslations("edit.title", {
          item: defaultLabel,
        }),
      description:
        messages?.edit.description ??
        groupTranslations("edit.description", {
          item: defaultLabel,
        }),
      cancel: messages?.edit.cancel ?? groupTranslations("edit.cancel"),
      confirm: messages?.edit.confirm ?? groupTranslations("edit.confirm"),
    },
    delete: {
      title:
        messages?.delete.title ??
        groupTranslations("delete.title", {
          item: defaultLabel,
        }),
      description:
        messages?.delete.description ??
        groupTranslations("delete.description", {
          item: defaultLabel,
        }),
      cancel: messages?.delete.cancel ?? groupTranslations("delete.cancel"),
      confirm: messages?.delete.confirm ?? groupTranslations("delete.confirm"),
    },
  };

  const [processing, setProcessing] = useState<boolean>();
  const [mounted, setMounted] = useState<boolean>(false);

  const [count, setCount] = useState<number>(0);
  const [index, setIndex] = useState<ItemIndex>(count);
  const [edit, setEdit] = useState<ItemIndex>(undefined);
  const [excluded, setExcluded] = useState<ItemIndex[]>([]);
  const [fields, setFields] = useState<Fields>({});
  const [identity, setIdentity] = useState<string | undefined>();

  const getFieldName = useCallback(
    (field: string, forcedIndex?: ItemIndex) => {
      if (forcedIndex !== undefined) {
        return `${prefix}.${forcedIndex}.${field}`;
      }
      if (list || index === "edit") {
        return `${prefix}.${index}.${field}`;
      }
      return `${prefix}.${field}`;
    },
    [prefix, list, index]
  );

  const declareField = (
    field: string,
    info?: Field,
    identity: boolean = false
  ) => {
    if (fields[field]) {
      return;
    }
    if (identity) {
      setIdentity(field);
    }
    setFields((prev) => ({ ...prev, [field]: info || { type: "" } }));
  };

  const getField = useCallback(
    (
      name: string
    ): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null => {
      const fieldName = getFieldName(name);

      const selector = [
        `input[name="${fieldName}"]`,
        `select[name="${fieldName}"]`,
        `textarea[name="${fieldName}"]`,
      ].join(",");

      const element = document.querySelector(selector) as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
        | null;

      return element;
    },
    [getFieldName]
  );

  const validateGroup = () => {
    let hasError = false;
    Object.keys(fields).forEach((field) => {
      const fieldName = getFieldName(field);
      const element = getField(field);

      if (!element) return;

      const isValid = element.checkValidity();

      if (!isValid) {
        const error = element.validationMessage || t("UI.input.error.invalid");
        form.setError(fieldName, error);
        if (!hasError) element.focus();
        hasError = true;
      } else {
        form.setError(fieldName, undefined);
      }
    });

    return !hasError;
  };

  const addNew = () => {
    if (!validateGroup()) {
      return;
    }

    form.setError(prefix, undefined);
    const newCount = count + 1;
    setCount(newCount);

    setIndex(newCount);
    setEdit(undefined);

    onClose();
    setProcessing(false);
  };

  const editItem = (item: ItemIndex) => {
    setEdit(item);
    setProcessing(true);

    Object.keys(fields).forEach((field) => {
      const fieldName = getFieldName(field, list ? item : undefined);
      const editName = getFieldName(field, "edit");

      form.setValue(editName, form.values?.[fieldName]);
      form.setError(editName, form.errors[fieldName]);
    });
    setIndex("edit");
    onOpen();
  };

  const handleEditCancel = () => {
    Object.keys(fields).forEach((field) => {
      form.setValue(getFieldName(field, "edit"), undefined);
    });
    setEdit(undefined);
    setIndex(count);
    onClose();
    setProcessing(false);
  };

  const handleEditConfirm = () => {
    if (!validateGroup()) {
      return;
    }
    setProcessing(true);
    Object.keys(fields).forEach((field) => {
      const fieldName = list
        ? getFieldName(field, list ? edit : undefined)
        : `${prefix}.${field}`;
      form.setValue(fieldName, form.values?.[getFieldName(field, "edit")]);
      form.setError(fieldName, undefined);

      const editName = getFieldName(field, "edit");
      form.setValue(editName, undefined);
      form.setError(editName, undefined);
    });

    form.setError(prefix, undefined);
    setEdit(undefined);
    setIndex(count);
    onClose();
    setProcessing(false);
  };

  const removeItem = (item: ItemIndex) => {
    setProcessing(true);
    setExcluded((prev) => [...prev, item]);
    Object.keys(fields).forEach((field) => {
      form.setValue(getFieldName(field), undefined);
      form.setError(getFieldName(field), undefined);
    });
    form.setError(prefix, undefined);
    setCount((prev) => prev - 1);
  };

  useEffect(() => {
    const values = toNested(form.values);
    const length = values[prefix]?.length ?? 0;

    if (!mounted) {
      setExcluded([]);
      setEdit(undefined);
      setCount(length);
      setIndex(length);
      setMounted(true);
    } else {
      if (!processing) {
        setCount((prevCount) => {
          if (prevCount !== length) {
            setIndex(length);
            return length;
          }
          return prevCount;
        });
      }
    }
  }, [prefix, form.values, mounted, processing, onOpen, onClose]);

  useEffect(() => {
    if (form.validations[prefix]) return;
    form.setValidation(prefix, () => {
      if (min && count < min) {
        form.setError(prefix, t("UI.input.error.min_items", { min: min }));
      }
      if (max && count > max) {
        form.setError(prefix, t("UI.input.error.max_items", { max: max }));
      }
    });
  }, [prefix, min, max, form, count, t]);

  const fieldErrors = Object.keys(form.errors).reduce<ValidationError[]>(
    (acc, field) => {
      if (field.startsWith(prefix)) {
        if (Array.isArray(form.errors[field])) {
          acc.push(...form.errors[field]);
        } else {
          acc.push(form.errors[field]);
        }
      }
      return acc;
    },
    []
  );

  const groupError = form.errors[prefix]
    ? Array.isArray(form.errors[prefix])
      ? form.errors[prefix].join(", ")
      : form.errors[prefix]
    : fieldErrors.length > 0
    ? fieldErrors.join(", ")
    : undefined;

  return (
    <InputGroupProvider.Provider
      value={{
        disclosure: {
          ...disclosure,
          onOpen: () => {
            setProcessing(true);
            disclosure.onOpen();
          },
        },

        prefix,
        label,
        error,
        buttonLabel,
        min,
        max,
        description,
        list,
        modal,
        messages: defaultMessages,

        count,
        edit,
        index,
        excluded,
        fields,
        identity,

        getFieldName,
        declareField,
        addNew,
        editItem,
        handleEditCancel,
        handleEditConfirm,
        removeItem,
      }}
    >
      <div
        className="group-group relative flex flex-col gap-2 pt-[calc(1em+8px)] w-full"
        data-min-fulfilled={min ? count - excluded.length >= min : undefined}
        data-max-fulfilled={max ? count - excluded.length <= max : undefined}
      >
        {(list || modal) && label && (
          <label
            className={cn(
              "top-3.5 left-0 z-20 absolute gap-2 *:pl-2 max-w-full text-sm truncate !transition-all -translate-y-1/2 !duration-100",
              form.errors[prefix]
                ? "text-danger"
                : "text-gray-700 dark:text-gray-200"
            )}
          >
            <RenderHolderInputs
              prefix={prefix}
              fields={fields}
              list={list}
              count={count}
              excluded={excluded}
              form={form}
            />
            {label && (
              <span
                className={cn(
                  required &&
                    "after:ms-0.5 !pl-0 after:text-danger after:content-['*']"
                )}
              >
                {typeof label === "string" ? label : label.default}
              </span>
            )}
            {min && (
              <span className="group-group-data-[min-fulfilled=false]:font-semibold text-default-500 group-group-data-[min-fulfilled=true]:text-default-400">
                min: {min}
              </span>
            )}
            {max && (
              <span className="group-group-data-[max-fulfilled=false]:font-semibold text-default-500 group-group-data-[max-fulfilled=true]:text-default-400">
                max: {max}
              </span>
            )}
          </label>
        )}
        {(groupError || description) && (
          <div className="-bottom-[20px] -left-0.5 absolute flex flex-col gap-1.5 p-1 max-w-full">
            {!groupError && description && (
              <div className="text-foreground-400 text-tiny">{description}</div>
            )}
            {groupError && (
              <div
                className="text-danger text-tiny truncate"
                title={groupError}
              >
                {groupError}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </InputGroupProvider.Provider>
  );
};

interface RenderHolderInputsProps {
  list: boolean;
  count: number;
  excluded: ItemIndex[];
  prefix: string;
  fields: Fields;
  form: FormProviderProps;
}

const RenderHolderInputs: React.FC<RenderHolderInputsProps> = ({
  list,
  count,
  excluded,
  prefix,
  fields,
  form,
}) => {
  return (
    <div className="hidden holder-inputs" hidden>
      {list &&
        Array.from({ length: count }).map((_, i) => {
          if (excluded.includes(i)) return null;
          return (
            <React.Fragment key={i}>
              {Object.keys(fields).map((field) => {
                const fullFieldName = `${prefix}.${i}.${field}`;
                const value = form.values?.[fullFieldName] ?? "";
                return (
                  <input
                    key={`${i}-${field}`}
                    name={fullFieldName}
                    value={value}
                    {...hiddenInputProps}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      {!list &&
        Object.keys(fields).map((field) => {
          const fullFieldName = `${prefix}.${field}`;
          const value = form.values?.[prefix]?.[field] ?? "";

          return (
            <input
              key={fullFieldName}
              name={fullFieldName}
              value={value}
              {...hiddenInputProps}
            />
          );
        })}
    </div>
  );
};

export const useGroup = (): InputGroupProviderProps | undefined => {
  return useContext(InputGroupProvider);
};

export default InputGroup;
