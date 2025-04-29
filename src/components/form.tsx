import { parseNested, toNested } from "@/lib/nested";
import { useToast } from "@/service/toast";
import type { FormErrors, FormValue, FormValues } from "@/types/form";
import {
  FormProps as HeroUIFormProps,
  Form as HeroUIForm,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Validation = () => void;
export type Validations = Record<string, ValidationError>;

export interface FormProps extends HeroUIFormProps {
  children?: React.ReactNode;
  initialData?: FormValues;
  onSubmit?: (values: FormValues) => void;
}

export interface FormProviderProps {
  formId: string;
  values?: FormValues;
  errors: FormErrors;
  setValue: (address: string, value: FormValue) => void;
  setError: (address: string, error: ValidationError) => void;
  validations: Validations;
  setValidation: (address: string, validation: Validation) => void;
}

const FormProvider = createContext<FormProviderProps | undefined>(undefined);

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  initialData,
  validationErrors,
  ...props
}) => {
  const [formId, setFormId] = useState("");
  useEffect(() => {
    setFormId(`form-${Math.random().toString(36).substring(2, 9)}`);
  }, []);
  const t = useTranslations();
  const toast = useToast();
  const [values, setValues] = useState<FormValues>(
    parseNested(initialData ?? {})
  );

  const [errors, setErrors] = useState<FormErrors>(validationErrors ?? {});
  const [validations, setValidations] = useState<Validations>({});

  const notifyError = useCallback(() => {
    if (Object.keys(errors).length > 0) {
      toast.error({
        description: t("Messages.errors.form"),
      });
    }
  }, [errors, t, toast]);

  const setError = useCallback((address: string, error?: ValidationError) => {
    setErrors((prevErrors: FormErrors) => {
      const newErrors = { ...prevErrors };
      if (error === undefined) {
        delete newErrors[address];
      } else {
        newErrors[address] = error;
      }
      return newErrors;
    });
  }, []);

  const setValue = useCallback(
    (address: string, value?: FormValue) => {
      setValues((prevValues: FormValues) => {
        const newValues = { ...prevValues };
        if (value === undefined) {
          delete newValues[address];
        } else {
          newValues[address] = value;
        }
        // setError(address, undefined);
        return newValues;
      });
    },
    []
  );

  const setValidation = useCallback(
    (address: string, validation: Validation) => {
      setValidations((prevValidations: Record<string, Validation>) => {
        const newValidations = { ...prevValidations };
        if (validation === undefined) {
          delete newValidations[address];
        } else {
          newValidations[address] = validation;
        }
        return newValidations;
      });
    },
    []
  );

  const onSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Object.keys(validations).forEach((key) => {
      const validation = validations[key];
      if (validation) {
        validation();
      }
    });
    const hasErrors = Object.keys(errors).length > 0;
    if (!hasErrors) {
      const data = Object.fromEntries(new FormData(event.currentTarget));
      const nestedData = toNested(data);

      onSubmit?.(nestedData);
      return;
    }
    notifyError();
  };

  useEffect(() => {
    if (validationErrors) {
      setErrors(validationErrors);
    }
  }, [validationErrors]);

  useEffect(() => {
    if (initialData) {
      setValues(parseNested(initialData));
    }
  }, [initialData]);

  return (
    <>
      <FormProvider.Provider
        value={{
          formId,
          errors,
          values,
          setValue,
          setError,
          validations,
          setValidation,
        }}
      >
        <HeroUIForm
          onSubmit={onSubmitHandle}
          onInvalid={() => {
            notifyError();
          }}
          validationErrors={errors}
          {...props}
          id={formId}
        >
          {children}
        </HeroUIForm>
      </FormProvider.Provider>
    </>
  );
};

export const useForm = (): FormProviderProps | undefined => {
  return useContext(FormProvider);
};

export default Form;
