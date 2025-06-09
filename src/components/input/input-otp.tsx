import {
  InputOtpProps as HeroUIInputOptProps,
  InputOtp as HeroUIInputOtp,
} from "@heroui/react";
import { useField } from "@/hooks/use-field";

export interface InputOtpProps extends HeroUIInputOptProps {
  length: number;
  queryCollectable?: boolean;
}

export const InputOtp: React.FC<InputOtpProps> = ({
  name: inputName,
  length,
  value,
  onValueChange,
  queryCollectable = false,
  required,
  isRequired,
  ...props
}) => {
  const isFieldRequired = required ?? isRequired ?? false;

  const {
    name,
    value: fieldValue,
    onChange,
  } = useField<string>(inputName, {
    initialValue: value,
    onChange: onValueChange,
    required: isFieldRequired,
    queryCollectable,
    type: props.type ?? "text",
  });

  return (
    <HeroUIInputOtp
      name={name}
      length={length}
      value={fieldValue}
      onValueChange={onChange}
      classNames={{
        input: "w-12 h-12 text-center text-2xl",
        helperWrapper:
          "absolute min-w-max -bottom-[12px] -translate-x-1/2 left-1/2 flex justify-center text-danger text-tiny text-start truncate",
      }}
      required={isFieldRequired}
      isRequired={isFieldRequired}
      {...props}
    />
  );
};
