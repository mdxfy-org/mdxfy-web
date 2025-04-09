import type { FormErrors, FormValue } from "@/types/form";
import {
  FormProps as HeroUIFormProps,
  Form as HeroUIForm,
} from "@heroui/react";
import { AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export interface FormProps extends HeroUIFormProps {
  children?: React.ReactNode;
  success?: (response: AxiosResponse<FormValue, FormValue>) => void;
  error?: (error: Error) => void;
  finally?: () => void;
}

interface FormProviderProps {
  // values: FormValues;
  errors: FormErrors;
}

const FormProvider = createContext<FormProviderProps | undefined>(undefined);

const Form: React.FC<FormProps> = ({
  children,
  validationErrors,
  ...props
}) => {
  const [errors, setErrors] = useState<FormErrors>(validationErrors ?? {});

  useEffect(() => {
    if (
      validationErrors &&
      Object.keys(validationErrors).length > 0 &&
      validationErrors !== errors
    ) {
      setErrors(validationErrors);
    }
  }, [validationErrors, errors]);

  return (
    <FormProvider.Provider
      value={{
        errors,
      }}
    >
      <HeroUIForm validationErrors={validationErrors} {...props}>{children}</HeroUIForm>
    </FormProvider.Provider>
  );
};

export const useForm = (): FormProviderProps | undefined => {
  return useContext(FormProvider);
};

export default Form;
