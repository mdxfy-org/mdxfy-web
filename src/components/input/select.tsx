import {
  SelectProps as HeroUISelectProps,
  Select as HeroUISelect,
  SelectItem as HeroUISelectItem,
  cn,
} from "@heroui/react";

import { useField } from "@/hooks/use-field";
import { Options } from "@/types/options";

export type SelectProps = {
  queryCollectable?: boolean;
  children?: HeroUISelectProps["children"];
  options?: Options;
} & Omit<HeroUISelectProps, "children">;

export const Select: React.FC<SelectProps> = ({
  name: inputName,
  value,
  className,
  queryCollectable = false,
  options,
  disabled,
  children,
  required,
  isRequired,
  multiple,
  ...props
}) => {
  const isFieldRequired = required ?? isRequired ?? false;

  const {
    name,
    value: fieldValue,
    onChange,
  } = useField<HeroUISelectProps["value"]>(inputName, {
    initialValue: value,
    required: isFieldRequired,
    queryCollectable,
    queryCollectFunction({ name, router }) {
      return String(router.query[name]).split(",");
    },
    type: multiple ? "select-multiple" : "select",
  });

  return (
    <HeroUISelect
      name={name}
      classNames={{
        base: "relative max-h-10",
        label: "top-6 !-translate-y-[3.10em] text-foreground",
        helperWrapper: "absolute -bottom-[20px] -left-0.5 max-w-full",
        errorMessage: "truncate",
        listbox: "!transition-colors !duration-100 ",
        listboxWrapper: "!transition-colors !duration-100",
      }}
      labelPlacement="outside"
      variant="bordered"
      selectionMode={multiple ? "multiple" : "single"}
      className={cn(
        "text-gray-700 dark:text-gray-200 transition-colors duration-100 select",
        className,
        disabled && "opacity-50 pointer-events-none"
      )}
      selectedKeys={
        Array.isArray(fieldValue)
          ? fieldValue
              .filter((v) => v !== undefined && v !== null)
              .map(String)
              .filter((key) => key !== "undefined")
          : fieldValue !== undefined &&
            fieldValue !== null &&
            String(fieldValue) !== "undefined"
          ? [String(fieldValue)]
          : []
      }
      onSelectionChange={(keys) => {
        const selectedKeys = Array.from(keys as Set<string>);
        if (multiple) {
          onChange(selectedKeys);
        } else {
          onChange(selectedKeys[0]);
        }
      }}
      required={isFieldRequired}
      isRequired={isFieldRequired}
      {...props}
    >
      {options
        ? options.map((option) => (
            <HeroUISelectItem
              key={option.value}
              textValue={option.label}
              description={option.description}
            >
              {option.label}
            </HeroUISelectItem>
          ))
        : children ?? null}
    </HeroUISelect>
  );
};

export const SelectItem = HeroUISelectItem;
