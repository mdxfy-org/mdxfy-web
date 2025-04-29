import {
  CalendarDate,
  DatePicker as HeroUIDatePicker,
  DatePickerProps as HeroUIDatePickerPro,
} from "@heroui/react";
import { useGroup } from "@/components/input/group/input-group";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "../form";
import { useRouter } from "next/router";
import { parseQueryDate } from "@/lib/utils";
import {parseDate} from "@internationalized/date";


export type DatePickerValue = CalendarDate | null | undefined;

export interface DatePickerProps extends HeroUIDatePickerPro {
  required?: boolean;
  label?: string;
  queryCollectable?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name: inputName,
  queryCollectable,
  onChange,
  value,
  required,
  isRequired,
  ...props
}) => {
  const router = useRouter();
  const form = useForm();
  const group = useGroup();

  const name = inputName && group ? group.getFieldName(inputName) : inputName;
  const isFieldRequired = required ?? isRequired ?? false;

  const [hasFirstRender, setHasFirstRender] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<DatePickerValue>();

  const changeValue = useCallback(
    (newValue?: DatePickerValue) => {
      if (newValue && newValue !== inputValue) {
        if (name && form) {
          form.setValue(name, newValue);
          form.setError(name, undefined);
        }
        setInputValue(newValue);
      }
    },
    [name, form, inputValue]
  );

  useEffect(() => {
    setInputValue(value as unknown as DatePickerValue);
  }, [value]);

  useEffect(() => {
    if (queryCollectable && name && router.query[name] && !hasFirstRender) {
      const queryValue = router.query[name];
      if (queryValue) {
        try {
          const val = parseQueryDate(queryValue as string);
          changeValue(val as unknown as DatePickerValue);
          setHasFirstRender(true);
        } catch (e) {
          console.log("Invalid date format in query", e);
        }
      }
    }
  }, [queryCollectable, name, changeValue, router.query, hasFirstRender]);

  useEffect(() => {
    if (name && form && form.values?.[name]) {
      changeValue(typeof form.values?.[name] === "string" ? parseDate(form.values?.[name]) : form.values?.[name]);
    }
  }, [value, form, name, changeValue]);

  useEffect(() => {
    if (group && inputName) {
      group.declareField(inputName, {
        type: "date",
        required: isFieldRequired ?? false,
      });
    }
  }, [group, inputName, isFieldRequired]);

  return (
    <HeroUIDatePicker
      name={name}
      value={inputValue}
      onChange={(val) => {
        onChange?.(val);
        changeValue(val);
      }}
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

export default DatePicker;
