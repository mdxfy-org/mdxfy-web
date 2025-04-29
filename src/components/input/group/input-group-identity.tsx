import { useForm } from "@/components/form";
import { useGroup } from "./input-group";
import { useEffect, useState } from "react";

export interface InputGroupIdentityProps {
  name: string;
  value?: string | number;
}

const InputGroupIdentity: React.FC<InputGroupIdentityProps> = ({
  name: inputName,
  value,
  ...props
}) => {
  const form = useForm();
  if (!form) {
    throw new Error("InputGroupDisplay must be used within a Form component");
  }
  const group = useGroup();
  if (!group) {
    throw new Error(
      "InputGroupDisplay must be used within a InputGroup component"
    );
  }
  const name = group.getFieldName(inputName);
  const [inputValue, setInputValue] = useState(value ?? form?.values[name]);

  useEffect(() => {
    if (name && form && form.values?.[name]) {
      setInputValue(form.values?.[name]);
    }
  }, [name, form, inputValue]);

  useEffect(() => {
    if (!!inputValue && form.values?.[name]) {
      group.declareField(inputName, {
        type: "hidden",
      });
    }
  }, [inputName, name, form.values, group, inputValue]);

  useEffect(() => {
    if (group && inputName) {
      group.declareField(inputName, {
        type: "identity",
        required: false,
      });
    }
  }, [inputName, group]);

  return (
    <>
      {!name.includes(".edit.") && !!inputValue && (
        <input
          name={name}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
          type="hidden"
          hidden={true}
          aria-hidden="true"
          {...props}
        />
      )}
    </>
  );
};

export default InputGroupIdentity;
