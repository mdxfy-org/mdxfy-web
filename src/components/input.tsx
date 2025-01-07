import { motion } from "framer-motion";
import {
  Button,
  InputProps as NextUIInputProps,
  Input as NextUIInput,
} from "@nextui-org/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export interface InputProps extends NextUIInputProps {
  taggableVisibility?: boolean;
  error?: string | Record<string, string>;
}

const Input = ({ taggableVisibility, ...props }: InputProps) => {
  const t = useTranslations();
  const [isPassVisible, setIsPassVisible] = useState(false);

  const togglePassVisibility = () => setIsPassVisible(!isPassVisible);

  return (
    <NextUIInput
      classNames={{
        base: "relative",
        label: "top-6",
        helperWrapper: "absolute -bottom-[20px] -left-0.5 min-w-max",
      }}
      endContent={
        taggableVisibility &&
        props.type === "password" && (
          <Button
            type="button"
            size="sm"
            variant="flat"
            className="-right-[9px]"
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
                className="group-data-[pressed=true]:scale-y-90 text-default-700 text-xl transition-transform pointer-events-none"
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
                className="group-data-[pressed=true]:scale-y-85 text-default-700 text-xl transition-transform pointer-events-none"
              />
            </motion.div>
          </Button>
        )
      }
      {...props}
      validate={(value) => {
        if (props.isRequired && !value) {
          return t("Base.fill_this_field");
        }
        if (props.validate) {
          return props.validate(value);
        }
        return null;
      }}
      type={isPassVisible ? "text" : props.type}
    />
  );
};

export default Input;
