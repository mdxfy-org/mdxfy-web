import { useField } from "@/hooks/use-field";
import {
  cn,
  CheckboxProps as HeroUICheckboxProps,
  Checkbox as HeroUICheckbox,
} from "@heroui/react";

export interface CheckboxProps extends HeroUICheckboxProps {
  children?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name: inputName,
  children,
  isRequired,
  ...props
}) => {
  const {
    name,
    value: checked,
    error,
    onChange,
  } = useField<boolean>(inputName, {
    initialValue: false,
    type: "checkbox",
    required: isRequired ?? false,
  });

  return (
    <div className="relative flex flex-row justify-start items-center gap-2 px-1 py-2 w-full">
      <HeroUICheckbox
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
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
