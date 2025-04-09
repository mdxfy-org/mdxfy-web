import {
  InputOtpProps as HeroUIInputOptProps,
  InputOtp as HeroUIInputOtp,
} from "@heroui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface InputOtpProps extends HeroUIInputOptProps {
  length: number;
  queryCollectable?: boolean;
}

const InputOtp: React.FC<InputOtpProps> = ({
  length,
  name,
  value,
  onValueChange,
  queryCollectable = false,
  ...props
}) => {
  const router = useRouter();

  const [hasFirstRender, setHasFirstRender] = useState(false);
  const [inputValue, setInputValue] = useState(value ?? "");

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
        setInputValue(val);
        onValueChange?.(val);
        setHasFirstRender(true);
      }
    }
  }, [queryCollectable, name, onValueChange, router.query, hasFirstRender]);

  return (
    <HeroUIInputOtp
      name={name}
      length={length}
      value={inputValue}
      onValueChange={setInputValue}
      classNames={{
        input: "w-12 h-12 text-center text-2xl",
        helperWrapper:
          "absolute min-w-max -bottom-[12px] -translate-x-1/2 left-1/2 flex justify-center text-danger text-tiny text-start truncate",
      }}
      {...props}
    />
  );
};

export default InputOtp;
