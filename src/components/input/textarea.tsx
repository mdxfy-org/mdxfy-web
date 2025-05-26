import {
  TextAreaProps as HeroUITextAreaProps,
  Textarea as HeroUITextarea,
} from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
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

export interface TextAreaProps extends HeroUITextAreaProps {
  format?: (value: string, info: InputFormatInfo) => string;
  queryCollectable?: boolean;
  taggableVisibility?: boolean;
}

const Textarea: React.FC<TextAreaProps> = ({
  name: inputName,
  value,
  format,
  className,
  queryCollectable = false,
  taggableVisibility,
  disabled,
  onChange,
  required,
  isRequired,
  ...props
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();
  const t = useTranslations();
  const form = useForm();
  const group = useGroup();

  const name = inputName && group ? group.getFieldName(inputName) : inputName;
  const isFieldRequired = required ?? isRequired ?? false;

  const [hasFirstRender, setHasFirstRender] = useState(false);
  const [inputValue, setInputValue] = useState(
    value ?? form?.values?.[name] ?? ""
  );
  const [isPassVisible, setIsPassVisible] = useState(false);

  const togglePassVisibility = () => setIsPassVisible(!isPassVisible);

  const changeValue = useCallback(
    (newValue?: string) => {
      const finalValue = format
        ? format(newValue ?? "", { form, group })
        : newValue ?? "";
      if (name && form) {
        form.setValue(name, finalValue);
        form.setError(name, undefined);
      }
      setInputValue(finalValue);
      onChange?.({
        target: { value: finalValue },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    },
    [name, form, group, onChange, format]
  );

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value, setInputValue]);

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
    <HeroUITextarea
      ref={ref}
      name={name}
      classNames={{
        base: "!relative",
        label: "!translate-y-[4.5px] start-0 text-foreground",
        helperWrapper: "!absolute !-bottom-[20px] !-left-0.5 max-w-full",
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
      onChange={(e) => changeValue(e.target.value)}
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

export default Textarea;
