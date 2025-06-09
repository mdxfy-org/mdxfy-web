import {
  InputProps as HeroUIInputProps,
  Input as HeroUIInput,
  cn,
} from "@heroui/react";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import PasswordVisibilityToggle from "../ux/password-visibility-toggle";
import { InputGroupProviderProps } from "@/components/input/group/input-group";
import { FormProviderProps } from "../form/form";
import { useField } from "@/hooks/use-field";

export interface InputProps extends HeroUIInputProps {
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

export const Input: React.FC<InputProps> = ({
  name: inputName,
  value,
  format,
  className,
  queryCollectable = false,
  taggableVisibility,
  disabled,
  onChange,
  required,
  isRequired,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const t = useTranslations();

  const isFieldRequired = required ?? isRequired ?? false;

  const field = useField<string>(inputName, {
    initialValue: value ?? "",
    format,
    onChange: (val: string) => {
      if (onChange) {
        onChange({
          target: { value: val },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    },
    required: isFieldRequired,
    type: props.type ?? "text",
    validate: (val) => {
      if (isFieldRequired && !val) {
        return t("UI.messages.fill_this_field");
      }
      if (props.validate) {
        const result = props.validate(val);
        if (result === true) return null;
        if (Array.isArray(result)) return result.join(", ");
        return result || null;
      }
      return null;
    },
    queryCollectable,
  });

  const [isPassVisible, setIsPassVisible] = useState(false);
  const togglePassVisibility = () => setIsPassVisible((prev) => !prev);

  return (
    <HeroUIInput
      ref={ref}
      name={field.name}
      classNames={{
        base: "!relative",
        label: "!top-6 !-translate-y-[3.25em] start-0 text-foreground",
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
      value={field.value}
      onValueChange={field.onChange}
      endContent={
        taggableVisibility &&
        props.type === "password" && (
          <PasswordVisibilityToggle
            isPassVisible={isPassVisible}
            togglePassVisibility={() => {
              ref.current?.focus();
              togglePassVisibility();
            }}
          />
        )
      }
      required={isFieldRequired}
      isRequired={isFieldRequired}
      {...props}
      type={isPassVisible ? "text" : props.type}
      disabled={disabled}
    />
  );
};
