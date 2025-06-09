import {
  CalendarDate,
  DatePicker as HeroUIDatePicker,
  DatePickerProps as HeroUIDatePickerProps,
} from "@heroui/react";
import { useField } from "@/hooks/use-field";
import { parseToCalendarDate } from "@/lib/date";
import { parseDate } from "@internationalized/date";

export type DatePickerValue = CalendarDate | null | undefined;

export interface DatePickerProps
  extends Omit<HeroUIDatePickerProps, "validate"> {
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
        ? parseToCalendarDate(initialFieldValue) as unknown as DatePickerValue
        : initialFieldValue as DatePickerValue,
    onChange: (value) => {
      propOnChange?.((value as null) ?? null);
    },
    queryCollectable: queryCollectable ?? false,
    queryCollectFunction: ({ name, router }) => {
      if (name) {
        const queryValue: string | undefined = Array.isArray(router.query[name])
          ? router.query[name][0]
          : router.query[name];
        if (queryValue) {
          return parseDate(queryValue) as unknown as DatePickerValue;
        }
      }
    },
    required: isFieldRequired,
    type: "date",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (value: any) => {
    const parsedValue = value ? parseToCalendarDate(value) : null;
    onChange(parsedValue as unknown as DatePickerValue);
    propOnChange?.(parsedValue as null);
  };

  return (
    <HeroUIDatePicker
      name={name}
      value={typeof value === "string" ? undefined : value}
      onChange={handleChange}
      classNames={{
        base: "relative gap-1 !pb-0",
        label: "top-6 !translate-y-[0.30em] w-max pr-2",
        helperWrapper: "absolute -bottom-[20px] -left-0.5 min-w-max p-0",
        input: "!transition-colors !duration-100 ",
        inputWrapper: "!transition-colors !duration-100",
        selectorButton: "rounded-lg left-0.5",
      }}
      variant="bordered"
      labelPlacement="outside"
      isRequired={isFieldRequired}
      {...props}
    />
  );
};
