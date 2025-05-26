import {
  NumberInputProps as HeroUIINumberInputProps,
  NumberInput as HeroUINumberInput,
} from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
// import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import PasswordVisibilityToggle from "../ux/password-visibility-toggle";
import {
  InputGroupProviderProps,
  useGroup,
} from "@/components/input/group/input-group";
import { FormProviderProps, useForm } from "../form/form";

export type InputFormatInfo = {
  form?: FormProviderProps;
  group?: InputGroupProviderProps;
};

export interface NumberInputProps extends HeroUIINumberInputProps {
  queryCollectable?: boolean;
  taggableVisibility?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  name: inputName,
  value,
  className,
  // queryCollectable = false,
  taggableVisibility,
  disabled,
  onChange,
  required,
  isRequired,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);

  // const router = useRouter();
  const t = useTranslations();
  const form = useForm();
  const group = useGroup();

  const name = inputName && group ? group.getFieldName(inputName) : inputName;
  const isFieldRequired = required ?? isRequired ?? false;

  // const [hasFirstRender, setHasFirstRender] = useState(false);
  const [inputValue, setInputValue] = useState(
    value ?? form?.values?.[name] ?? ""
  );
  const [isPassVisible, setIsPassVisible] = useState(false);

  const togglePassVisibility = () => setIsPassVisible(!isPassVisible);

  const changeValue = useCallback(
    (newValue?: number) => {
      const finalValue = newValue ?? "";
      if (name && form) {
        form.setValue(name, finalValue);
        form.setError(name, undefined);
      }
      setInputValue(finalValue);
      onChange?.({
        target: { value: finalValue },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    },
    [name, form, onChange]
  );

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value, setInputValue]);

  // useEffect(() => {
  //   if (queryCollectable && name && router.query[name] && !hasFirstRender) {
  //     const queryValue = router.query[name];
  //     if (queryValue) {
  //       const val = queryValue as string;
  //       changeValue(val);
  //       setHasFirstRender(true);
  //     }
  //   }
  // }, [queryCollectable, name, changeValue, router.query, hasFirstRender]);

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
    <HeroUINumberInput
      ref={ref}
      name={name}
      classNames={{
        base: "!relative",
        label: "!top-6 !-translate-y-[3.25em] start-0",
        helperWrapper: "!absolute !-bottom-[24px] !-left-0.5 max-w-full",
        errorMessage: "!truncate",
        input: "!transition-colors !duration-100",
        inputWrapper: "!transition-colors !duration-100",
      }}
      labelPlacement="outside"
      variant="bordered"
      className={cn(
        "text-gray-700 dark:text-gray-200 transition-colors duration-100",
        className,
        disabled && "opacity-50 pointer-events-none"
      )}
      value={inputValue}
      errorMessage={(v) => {
        if (!v && form && name) {
          form.setError(name, undefined);
        }
        return v.validationErrors;
      }}
      onChange={(e) => {
        if (typeof e === "number") {
          changeValue(e);
        } else {
          changeValue(Number(e.target.value.replace(/[^0-9]/g, "")));
        }
      }}
      endContent={
        taggableVisibility &&
        props.type === "password" && (
          <PasswordVisibilityToggle
            isPassVisible={isPassVisible}
            togglePassVisibility={() => {
              ref.current?.focus();
              togglePassVisibility();
            }}
          />
        )
      }
      validate={(value) => {
        if (isFieldRequired && !value) {
          return t("UI.messages.fill_this_field");
        }
        if (props.validate) {
          return props.validate(value);
        }
        return null;
      }}
      required={isFieldRequired}
      isRequired={isFieldRequired}
      {...props}
      type={isPassVisible ? "text" : props.type}
      disabled={disabled}
    />
  );
};

export default NumberInput;
