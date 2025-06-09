import {
  TextAreaProps as HeroUITextAreaProps,
  Textarea as HeroUITextarea,
  cn,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import { InputGroupProviderProps } from "@/components/input/group/input-group";
import { FormProviderProps } from "../form/form";
import { useField } from "@/hooks/use-field";

export interface TextAreaProps extends HeroUITextAreaProps {
  format?: (
    value: string,
    info: {
      form?: FormProviderProps;
      group?: InputGroupProviderProps;
    }
  ) => string;
  queryCollectable?: boolean;
  taggableVisibility?: boolean;
}

export const Textarea: React.FC<TextAreaProps> = ({
  name: inputName,
  value,
  format,
  className,
  queryCollectable = false,
  disabled,
  onChange: externalOnChange,
  required,
  isRequired,
  validate: propValidate,
  ...props
}) => {
  const t = useTranslations();
  const isFieldRequired = required ?? isRequired ?? false;

  const {
    name,
    value: fieldValue,
    error,
    validate,
    onChange,
  } = useField<string>(inputName, {
    initialValue: value ?? "",
    onChange: (val) => {
      if (externalOnChange) {
        externalOnChange({
          target: { value: val },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    },
    required: isFieldRequired,
    format,
    validate: (value: string) => {
      if (isFieldRequired && !value) {
        return t("UI.messages.fill_this_field");
      }
      if (propValidate) {
        const result = propValidate(value);
        return typeof result === "string" ? result : null;
      }
      return null;
    },
    queryCollectable,
  });

  return (
    <HeroUITextarea
      name={name}
      classNames={{
        base: "!relative",
        label: "!translate-y-[4.5px] start-0 text-foreground",
        helperWrapper: "!absolute !-bottom-[20px] !-left-0.5 max-w-full",
        errorMessage: "!truncate",
        input: "!transition-colors !duration-100",
        inputWrapper: "!transition-colors !duration-100",
      }}
      labelPlacement="outside"
      variant="bordered"
      className={cn(
        "text-gray-700 dark:text-gray-200 transition-colors duration-100",
        className,
        disabled && "opacity-50 pointer-events-none"
      )}
      value={fieldValue}
      errorMessage={error}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      validate={validate}
      required={isFieldRequired}
      isRequired={isFieldRequired}
      {...props}
      disabled={disabled}
    />
  );
};
