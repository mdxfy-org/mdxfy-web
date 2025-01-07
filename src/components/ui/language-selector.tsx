import {
  Select,
  SelectItem,
  SelectProps as NextUISelectProps,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import nextConfig from "../../../next.config";
import { Globe02Icon, LanguageSkillIcon } from "@hugeicons/react";
import { languages } from "@/internationalization/languages";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps extends Omit<NextUISelectProps, 'children'> {
  className?: string;
  children?: React.ReactNode;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  ...props
}: LanguageSelectorProps) => {
  const router = useRouter();
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const handleRouteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(router.pathname, undefined, { locale: event.target.value });
  };

  return (
    <Select
      onChange={handleRouteChange}
      className={cn("text-medium max-w-40", className)}
      classNames={{
        popoverContent: "rounded-md min-w-[10rem]",
        selectorIcon: "right-2",
      }}
      size="md"
      radius="sm"
      aria-label="Language"
      placeholder="Select language"
      isOpen={isSelectOpen}
      onOpenChange={setIsSelectOpen}
      defaultSelectedKeys={[
        router.locale ?? (nextConfig?.i18n?.defaultLocale || "default-locale"),
      ]}
      {...props}
      selectorIcon={
        <div className="relative">
          <motion.div
            initial="hidden"
            animate={isSelectOpen ? "hidden" : "visible"}
            className="right-1 absolute"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <Globe02Icon
              size={16}
              type="rounded"
              variant="stroke"
              className="text-default-700 text-xl pointer-events-none"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isSelectOpen ? "visible" : "hidden"}
            className="right-1 absolute"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <LanguageSkillIcon
              size={16}
              type="rounded"
              variant="stroke"
              className="text-default-700 text-xl pointer-events-none"
            />
          </motion.div>
        </div>
      }
      disableSelectorIconRotation
    >
      {languages.map((lang) => (
        <SelectItem startContent={lang.flag} key={lang.id} value={lang.id}>
          {lang.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export const LazyLanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  ...props
}: LanguageSelectorProps) => {
  return (
    <Select
      size="md"
      radius="sm"
      aria-label="Language"
      placeholder="Select language"
      className={cn("text-medium max-w-40", className)}
      {...props}
    >
      {languages.map((lang) => (
        <SelectItem startContent={lang.flag} key={lang.id} value={lang.id}>
          {lang.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default LanguageSelector;
