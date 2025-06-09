import {
  cn,
  NumberInputProps as HeroUIINumberInputProps,
  NumberInput as HeroUINumberInput,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import { useField } from "@/hooks/use-field";

export interface NumberInputProps extends HeroUIINumberInputProps {
  queryCollectable?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  name: inputName,
  value,
  className,
  disabled,
  onChange,
  required,
  isRequired,
  queryCollectable,
  ...props
}) => {
  const t = useTranslations();
  const isFieldRequired = required ?? isRequired ?? false;

  const field = useField<number | string>(inputName, {
    initialValue: value,
    required: isFieldRequired,
    type: props.type ?? "text",
    validate: (val) => {
      if (isFieldRequired && !val) {
        return t("UI.messages.fill_this_field");
      }
      if (props.validate) {
        const result = props.validate(Number(val));
        if (result === true || result === undefined) {
          return null;
        }
        if (Array.isArray(result)) {
          return result.join(", ");
        }
        return result;
      }
      return null;
    },
    queryCollectable,
  });

  return (
    <HeroUINumberInput
      name={field.name}
      classNames={{
        base: "!relative",
        label: "!top-6 !-translate-y-[3.25em] start-0",
        helperWrapper: "!absolute !-bottom-[24px] !-left-0.5 max-w-full",
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
      value={Number(field.value)}
      errorMessage={field.error}
      onValueChange={(v) => {
        field.onChange(v);
        onChange?.({
          target: { value: v },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      }}
      required={isFieldRequired}
      isRequired={isFieldRequired}
      {...props}
      disabled={disabled}
    />
  );
};
