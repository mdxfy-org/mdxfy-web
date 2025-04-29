import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Global } from "@solar-icons/react";
import LanguageSelector from "../ui/language-selector";
import { cn } from "@/lib/utils";

export interface CompactLanguageSelectorProps {
  className?: string;
}

const CompactLanguageSelector: React.FC<CompactLanguageSelectorProps> = ({
  className
}) => {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          isIconOnly
          className={cn("bg-default-200 text-default-600 text-xl", className)}
          size="sm"
        >
          <Global />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 rounded-md w-40">
        <LanguageSelector />
      </PopoverContent>
    </Popover>
  );
};

export default CompactLanguageSelector;
