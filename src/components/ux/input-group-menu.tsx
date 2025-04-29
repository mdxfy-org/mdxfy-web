import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { ItemIndex, useGroup } from "../input/group/input-group";
import IconOption from "../ui/icon-option";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { MenuDots, Pen, TrashBinMinimalistic } from "@solar-icons/react";
import { cn } from "@/lib/utils";

interface InputGroupMenuProps {
  index: ItemIndex;
}

const InputGroupMenu: React.FC<InputGroupMenuProps> = ({ index }) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const group = useGroup();
  if (!group) {
    throw new Error(
      "InputGroupMenu must be used within a InputGroup component"
    );
  }

  const transitionContent = {
    item: (
      (typeof group.label === "string" ? group.label : group.label?.default) ??
      t("UI.input_group.item")
    ).toLowerCase(),
  };

  return (
    <Popover
      placement="bottom-end"
      className={cn(
        "translate-x-1",
        isOpen && "opacity-25 duration-100 pointer-events-none",
        group.disclosure.isOpen && "opacity-0 pointer-events-none"
      )}
      isOpen={group.disclosure.isOpen ? isOpen : undefined}
      onOpenChange={(open) => setIsOpen(open)}
      radius="sm"
      offset={8}
    >
      <PopoverTrigger>
        <Button
          className="top-[2px] right-[2px] absolute opacity-100 md:opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 duration-75"
          type="button"
          size="sm"
          variant="flat"
          isIconOnly
        >
          <MenuDots className="rotate-90" weight="BoldDuotone" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("px-1 w-28 transition-all")}>
        <IconOption
          onClick={() => {
            setIsOpen(true);
            group.editItem(index);
          }}
          icon={<Pen />}
        >
          {t("UI.buttons.edit")}
        </IconOption>
        <IconOption
          onClick={() => {
            setIsOpen(false);
            group.removeItem(index);
          }}
          icon={<TrashBinMinimalistic weight="LineDuotone" />}
          confirmAction
          confirmActionInfo={{
            actionConfirmTitle: t(
              "UI.input_group.delete.title",
              transitionContent
            ),
            actionConfirmText: t(
              "UI.input_group.delete.description",
              transitionContent
            ),
            actionConfirmButtonColor: "danger",
            onConfirmModalChanged(isOpen) {
              setIsOpen(isOpen);
            },
          }}
        >
          {t("UI.buttons.delete")}
        </IconOption>
      </PopoverContent>
    </Popover>
  );
};

export default InputGroupMenu;
