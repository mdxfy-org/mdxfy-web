import {
  CheckboxProps as HeroUICheckboxProps,
  Checkbox as HeroUICheckbox,
} from "@heroui/react";
import { useForm } from "./form";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends HeroUICheckboxProps {
  children?: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({ children, name, ...props }) => {
  const form = useForm();

  const [checked, setChecked] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

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
    setError(undefined);
  }, [checked]);

  return (
    <div className="relative flex flex-row justify-start items-center gap-2 px-1 py-2 w-full">
      <HeroUICheckbox
        size="sm"
        name={name}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
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
