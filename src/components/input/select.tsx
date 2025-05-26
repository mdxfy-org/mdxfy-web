import {
  SelectProps as HeroUISelectProps,
  Select as HeroUISelect,
  SelectItem as HeroUISelectItem,
} from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { useGroup } from "@/components/input/group/input-group";
import { useForm } from "../form/form";
import { Options } from "@/types/options";

export interface SelectProps extends HeroUISelectProps {
  queryCollectable?: boolean;
  taggableVisibility?: boolean;
  options?: Options;
}

const Select: React.FC<SelectProps> = ({
  name: inputName,
  value,
  className,
  queryCollectable = false,
  disabled,
  onChange,
  children,
  required,
  isRequired,
  ...props
}) => {
  const router = useRouter();
  const form = useForm();
  const group = useGroup();

  const name = inputName && group ? group.getFieldName(inputName) : inputName;
  const isFieldRequired = required ?? isRequired ?? false;

  const [inputValue, setInputValue] = useState<string | number>(
    Array.isArray(value) ? value[0] : value ?? ""
  );
  const [hasFirstRender, setHasFirstRender] = useState(false);

  const changeValue = useCallback(
    (newValue?: string | number) => {
      if (newValue && newValue !== inputValue) {
        if (name && form) {
          form.setValue(name, newValue);
          form.setError(name, undefined);
        }
        setInputValue(newValue);
        onChange?.({
          target: { value: newValue },
        } as unknown as React.ChangeEvent<HTMLSelectElement>);
      }
    },
    [name, form, inputValue, onChange]
  );

  useEffect(() => {
    changeValue(inputValue ?? "");
  }, [inputValue, changeValue]);

  useEffect(() => {
    if (queryCollectable && name && router.query[name] && !hasFirstRender) {
      const queryValue = router.query[name];
      if (queryValue) {
        const val = queryValue as string;
        changeValue(val);
        setHasFirstRender(true);
      }
    }
  }, [queryCollectable, name, changeValue, router.query, hasFirstRender]);

  useEffect(() => {
    if (name && form && form.values?.[name]) {
      changeValue(form.values?.[name]);
    }
  }, [value, form, name, changeValue]);

  useEffect(() => {
    if (group && inputName) {
      group.declareField(inputName, {
        type: "select",
        required: isFieldRequired ?? false,
      });
    }
  }, [inputName, isFieldRequired, group]);

  useEffect(() => {
    if (name) {
      const element = document.querySelector(
        `select[name="${name}"]`
      ) as HTMLSelectElement;
      if (element) {
        element.setAttribute("required", String(isFieldRequired));
      }
    }
  }, [name, isFieldRequired]);

  return (
    <HeroUISelect
      name={name}
      classNames={{
        base: "relative",
        label: "top-6 !-translate-y-[3.10em] text-foreground",
        helperWrapper: "absolute -bottom-[20px] -left-0.5 max-w-full",
        errorMessage: "truncate",
        listbox: "!transition-colors !duration-100 ",
        listboxWrapper: "!transition-colors !duration-100",
      }}
      labelPlacement="outside"
      variant="bordered"
      className={cn(
        "text-gray-700 dark:text-gray-200 transition-colors duration-100 select",
        className,
        disabled && "opacity-50 pointer-events-none"
      )}
      selectedKeys={[inputValue]}
      onChange={(e) => {
        changeValue(e.target.value);
      }}
      onSelect={(e) => {
        changeValue(e.currentTarget.value);
      }}
      required={isFieldRequired}
      isRequired={isFieldRequired}
      {...props}
    >
      {children}
    </HeroUISelect>
  );
};

export const SelectItem = HeroUISelectItem;
export default Select;
