import {
  DatePicker as HeroUIDatePicker,
  DatePickerProps as HeroUIDatePickerProps,
} from "@heroui/react";
import { useField } from "@/hooks/use-field";
import { parseToCalendarDate } from "@/lib/date";
import { parseDate } from "@internationalized/date";

export type DatePickerValue = HeroUIDatePickerProps["value"];

export interface DatePickerProps extends HeroUIDatePickerProps {
  required?: boolean;
  label?: string;
  queryCollectable?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  name: inputName,
  queryCollectable,
  onChange: propOnChange,
  value: initialFieldValue,
  required,
  isRequired,
  ...props
}) => {
  const isFieldRequired = required ?? isRequired ?? false;

  const { name, value, onChange } = useField<DatePickerValue>(inputName, {
    initialValue:
      typeof initialFieldValue === "string"
        ? parseToCalendarDate(initialFieldValue)
        : initialFieldValue,
    onChange: (value) => {
      propOnChange?.(value ?? null);
    },
    queryCollectable: queryCollectable ?? false,
    queryCollectFunction: ({ name, router }) => {
      if (name) {
        const queryValue: string | undefined = Array.isArray(router.query[name])
          ? router.query[name][0]
          : router.query[name];
        if (queryValue) {
          return parseDate(queryValue);
        }
      }
    },
    required: isFieldRequired,
    type: "date",
  });

  return (
    <HeroUIDatePicker
      name={name}
      value={typeof value === "string" ? undefined : value}
      onChange={onChange}
      classNames={{
        base: "relative gap-1 !pb-0",
        label: "top-6 !translate-y-[0.30em] w-max pr-2",
        helperWrapper: "absolute -bottom-[20px] -left-0.5 min-w-max p-0",
        input: "!transition-colors !duration-100 ",
        inputWrapper: "!transition-colors !duration-100",
        selectorButton: "rounded-lg left-0.5",
      }}
      labelPlacement="outside"
      variant="bordered"
      isRequired={isFieldRequired}
      {...props}
    />
  );
};
