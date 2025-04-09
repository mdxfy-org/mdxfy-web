import { Button, Code, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { InformationCircleIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";

const PhoneNumberHelper: React.FC = () => {
  const t = useTranslations();

  return (
    <Popover className="translate-x-1" placement="top-end" radius="sm" offset={8}>
      <PopoverTrigger>
        <Button
          type="button"
          size="sm"
          variant="flat"
          className="-right-[10px]"
          isIconOnly
        >
          <InformationCircleIcon
            type="rounded"
            variant="stroke"
            className="text-default-700 text-xl pointer-events-none"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-1 px-1 py-2 max-w-xs text-gray-700 dark:text-gray-200">
          <div className="font-bold text-small">
            {t("UI.tooltips.write_number.title")}
          </div>
          <div className="text-tiny">{t("UI.tooltips.write_number.info")}</div>
          <div className="text-tiny">
            {t("UI.tooltips.write_number.example")}
            <Code className="p-0.5 px-1 text-tiny">+55 01 23456-7890</Code>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PhoneNumberHelper;
