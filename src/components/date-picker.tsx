import {
  DatePicker as HeroUIDatePicker,
  DatePickerProps as HeroUIDatePickerPro,
} from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";

export interface DatePickerProps extends HeroUIDatePickerPro {
  label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ ...props }) => {
  return (
    <I18nProvider>
      <HeroUIDatePicker
        classNames={{
          base: "relative",
          label: "top-6",
          helperWrapper: "absolute -bottom-[20px] -left-0.5 min-w-max",
          input: "!transition-colors !duration-100 ",
          inputWrapper: "!transition-colors !duration-100",
          selectorButton: "rounded-lg left-0.5",
        }}
        labelPlacement="outside"
        variant="bordered"
        {...props}
      />
    </I18nProvider>
  );
};

export default DatePicker;
