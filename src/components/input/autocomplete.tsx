// components/input/autocomplete.tsx
import {
  Autocomplete as HeroUIAutocomplete,
  AutocompleteProps as HeroUIAutocompleteProps,
  AutocompleteItem as HeroUIAutocompleteItem,
  cn,
} from "@heroui/react";
import { useField } from "@/hooks/use-field";
import { Option, Options } from "@/types/options";
import { useAsyncList } from "@react-stately/data";
import { useCallback, useEffect } from "react";

export type AutocompleteProps = {
  options?: Options;
  queryCollectable?: boolean;
  children?: HeroUIAutocompleteProps["children"];
} & Omit<
  HeroUIAutocompleteProps,
  "items" | "children" | "selectedKey" | "inputValue" | "onSelectionChange"
>;

export const Autocomplete: React.FC<AutocompleteProps> = ({
  name: inputName,
  value: valueProp,
  options,
  queryCollectable = false,
  allowsCustomValue,
  className,
  required,
  isRequired,
  ...props
}) => {
  const isFieldRequired = required ?? isRequired ?? false;

  const list = useAsyncList<Option>({
    load: async ({ filterText }) => {
      if (!filterText) {
        return { items: options ?? [] };
      }
      return {
        items:
          options?.filter(
            (item) =>
              item.label.toLowerCase().includes(filterText.toLowerCase()) ||
              (item.description &&
                item.description
                  .toLowerCase()
                  .includes(filterText.toLowerCase()))
          ) ?? [],
      };
    },
  });

  const updateLabel = useCallback(
    (value: string) => {
      const selectedLabel =
        options?.find((option) => option.value === value)?.label ?? "";
      if (list.filterText === selectedLabel) {
        return;
      }
      list.setFilterText(selectedLabel);
    },
    [options, list]
  );

  const { name, value, onChange } = useField<string | undefined>(inputName, {
    initialValue: valueProp as string | undefined,
    onChange: (value: string | undefined) => {
      list.setSelectedKeys(value ? new Set([value]) : new Set());
      updateLabel(value ?? "");
    },
    updateInputValue: updateLabel,
    required: isFieldRequired,
    queryCollectable,
    queryCollectFunction: ({ name, router }) =>
      String(router.query[name] ?? ""),
    type: "autocomplete",
  });

  // TODO: make a better way to handle search input updates
  useEffect(() => {
    updateLabel(value ?? "");
  }, [value, updateLabel]);

  return (
    <HeroUIAutocomplete
      name={name}
      labelPlacement="outside"
      variant="bordered"
      value={value}
      selectedKey={value}
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items}
      onSelectionChange={(key) =>
        onChange(key === null ? undefined : (key as string))
      }
      allowsCustomValue={allowsCustomValue}
      onInputChange={list.setFilterText}
      classNames={{
        base: "relative max-h-10 mb-6",
        // label: "top-6 !-translate-y-[3.10em] text-foreground",
        // helperWrapper: "absolute -bottom-[20px] -left-0.5 max-w-full",
        listbox: "!transition-colors !duration-100",
        listboxWrapper: "!transition-colors !duration-100",
      }}
      defaultItems={options}
      className={cn(
        "text-gray-700 dark:text-gray-200 transition-colors duration-100 autocomplete",
        className
      )}
      isRequired={isFieldRequired}
      {...props}
    >
      {(item) => {
        const opt = item as Option;
        return (
          <AutocompleteItem key={opt.value} description={opt.description}>
            {opt.label}
          </AutocompleteItem>
        );
      }}
    </HeroUIAutocomplete>
  );
};

export const AutocompleteItem = HeroUIAutocompleteItem;
