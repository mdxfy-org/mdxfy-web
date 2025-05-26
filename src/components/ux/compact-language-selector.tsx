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
          className={cn("bg-default-100 hover:bg-default-200 shadow-sm border border-default-300 text-default-700 text-xl duration-100", className)}
          size="sm"
        >
          <Global size={18}  />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 rounded-xl w-40">
        <LanguageSelector />
      </PopoverContent>
    </Popover>
  );
};

export default CompactLanguageSelector;
