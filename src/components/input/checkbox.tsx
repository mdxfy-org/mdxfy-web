import {
  CheckboxProps as HeroUICheckboxProps,
  Checkbox as HeroUICheckbox,
} from "@heroui/react";
import { useForm } from "../form";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useGroup } from "@/components/input/group/input-group";

export interface CheckboxProps extends HeroUICheckboxProps {
  children?: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name: inputName,
  children,
  ...props
}) => {
  const form = useForm();
  const group = useGroup();

  const name = inputName && group ? group.getFieldName(inputName) : inputName;

  const [checked, setChecked] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const changeValue = useCallback(
    (newValue?: boolean) => {
      if (name && form) {
        form.setValue(name, newValue);
        form.setError(name, undefined);
      }
      setChecked(newValue);
      setError(undefined);
    },
    [form, name]
  );

  useEffect(() => {
    if (name && form?.errors[name]) {
      setError(
        Array.isArray(form.errors[name])
          ? form.errors[name].join(", ")
          : form.errors[name]
      );
    }
  }, [form?.errors, name]);

  useEffect(() => {
    if (name) {
      setChecked(form?.values[name]);
    }
  }, [form?.values, name]);

  useEffect(() => {
    if (group && inputName) {
      group.declareField(inputName, {
        type: "checkbox",
        required: props.isRequired ?? false,
      });
    }
  }, [group, inputName, props.type, props.isRequired]);

  return (
    <div className="relative flex flex-row justify-start items-center gap-2 px-1 py-2 w-full">
      <HeroUICheckbox
        name={name}
        checked={checked}
        onChange={(e) => {
          changeValue(e.target.checked);
        }}
        size="sm"
        {...props}
      />
      <p
        className={cn(
          "text-sm text-start",
          error ? "text-danger" : "text-gray-700 dark:text-gray-200"
        )}
      >
        {children}
      </p>
      {error && (
        <p
          className="-bottom-2 absolute p-1 max-w-full text-danger text-tiny text-start truncate"
          title={error}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
