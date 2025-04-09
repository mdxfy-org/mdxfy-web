import { motion } from "framer-motion";
import {
  Button,
  InputProps as HeroUIInputProps,
  Input as HeroUIInput,
} from "@heroui/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

export interface InputProps extends HeroUIInputProps {
  format?: (value: string) => string;
  queryCollectable?: boolean;
  taggableVisibility?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  value,
  format,
  className,
  queryCollectable = false,
  taggableVisibility,
  disabled,
  onChange,
  ...props
}) => {
  const router = useRouter();
  const t = useTranslations();

  const [hasFirstRender, setHasFirstRender] = useState(false);
  const [inputValue, setInputValue] = useState(value ?? "");
  const [isPassVisible, setIsPassVisible] = useState(false);

  const togglePassVisibility = () => setIsPassVisible(!isPassVisible);

  useEffect(() => {
    if (value) {
      setInputValue(value);
      onChange?.({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [value, onChange]);

  useEffect(() => {
    if (format) {
      setInputValue(format(inputValue ?? ""));
      onChange?.({
        target: { value: format(inputValue ?? "") },
      } as React.ChangeEvent<HTMLInputElement>);
      return;
    }
    onChange?.({
      target: { value: inputValue ?? "" },
    } as React.ChangeEvent<HTMLInputElement>);
  }, [format, inputValue, onChange]);

  useEffect(() => {
    if (queryCollectable && name && router.query[name] && !hasFirstRender) {
      const queryValue = router.query[name];
      if (queryValue) {
        const val = queryValue as string;
        setInputValue(val);
        onChange?.({
          target: { value: val },
        } as React.ChangeEvent<HTMLInputElement>);
        setHasFirstRender(true);
      }
    }
  }, [queryCollectable, name, onChange, router.query, hasFirstRender]);

  return (
    <HeroUIInput
      name={name}
      classNames={{
        base: "relative",
        label: "top-6",
        helperWrapper: "absolute -bottom-[20px] -left-0.5 max-w-full",
        errorMessage: "truncate",
        input: "!transition-colors !duration-100 ",
        inputWrapper: "!transition-colors !duration-100",
      }}
      labelPlacement="outside"
      variant="bordered"
      className={cn(
        "text-gray-700 dark:text-gray-200 transition-colors duration-100",
        className,
        disabled && "opacity-50 pointer-events-none",
      )}
      value={inputValue}
      onChange={(e) => {
        if (format) {
          setInputValue(format(e.target.value));
          return;
        }
        setInputValue(e.target.value);
      }}
      endContent={
        taggableVisibility &&
        props.type === "password" && (
          <Button
            type="button"
            size="sm"
            variant="flat"
            className="-right-[10px]"
            isIconOnly
            onPress={togglePassVisibility}
          >
            <motion.div
              initial="hidden"
              animate={isPassVisible ? "hidden" : "visible"}
              className="absolute"
              variants={{
                hidden: { opacity: 0, rotateX: -90 },
                visible: { opacity: 1, rotateX: 0 },
              }}
            >
              <ViewOffIcon
                type="rounded"
                variant="bulk"
                className="text-default-700 text-xl group-data-[pressed=true]:scale-y-90 transition-transform pointer-events-none"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate={isPassVisible ? "visible" : "hidden"}
              className="absolute"
              variants={{
                hidden: { opacity: 0, rotateX: 90 },
                visible: { opacity: 1, rotateX: 0 },
              }}
            >
              <ViewIcon
                type="rounded"
                variant="stroke"
                className="text-default-700 text-xl group-data-[pressed=true]:scale-y-85 transition-transform pointer-events-none"
              />
            </motion.div>
          </Button>
        )
      }
      validate={(value) => {
        if (props.isRequired && !value) {
          return t("UI.messages.fill_this_field");
        }
        if (props.validate) {
          return props.validate(value);
        }
        return null;
      }}
      {...props}
      type={isPassVisible ? "text" : props.type}
      disabled={disabled}
    />
  );
};

export default Input;
