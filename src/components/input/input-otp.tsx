import {
  InputOtpProps as HeroUIInputOptProps,
  InputOtp as HeroUIInputOtp,
} from "@heroui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useGroup } from "@/components/input/group/input-group";
import { useForm } from "../form/form";

export interface InputOtpProps extends HeroUIInputOptProps {
  length: number;
  queryCollectable?: boolean;
}

const InputOtp: React.FC<InputOtpProps> = ({
  name: inputName,
  length,
  value,
  onValueChange,
  queryCollectable = false,
  required,
  isRequired,
  ...props
}) => {
  const router = useRouter();
  const form = useForm();
  const group = useGroup();

  const name = inputName && group ? group.getFieldName(inputName) : inputName;
  const isFieldRequired = required ?? isRequired ?? false;

  const [hasFirstRender, setHasFirstRender] = useState(false);
  const [inputValue, setInputValue] = useState(
    value ?? form?.values[name] ?? ""
  );

  const changeValue = useCallback(
    (newValue?: string) => {
      if (name && form) {
        form.setValue(name, newValue);
        form.setError(name, undefined);
      }
      setInputValue(newValue);
      onValueChange?.(newValue ?? "");
    },
    [name, form, onValueChange]
  );

  useEffect(() => {
    if (value) {
      setInputValue(value);
      onValueChange?.(value);
    }
  }, [value, onValueChange]);

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
      setInputValue(form.values?.[name]);
    }
  }, [name, form, inputValue]);

  useEffect(() => {
    if (group && inputName) {
      group.declareField(inputName, {
        type: props.type ?? "text",
        required: isFieldRequired ?? false,
      });
    }
  }, [group, inputName, props.type, isFieldRequired]);

  return (
    <HeroUIInputOtp
      name={name}
      length={length}
      value={inputValue}
      onValueChange={changeValue}
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

export default InputOtp;
