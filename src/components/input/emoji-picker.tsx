import {
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@heroui/react";
import { Input } from "./input";
import { useEffect, useState } from "react";
import { Emoji, EmojiPicker as Picker } from "frimousse";
import { useRouter } from "next/router";
import { Scroll } from "../scroll";

export interface EmojiPickerProps {
  children?: React.ReactNode;
  className?: string;
  emoji?: Emoji;
  onSelect?: (emoji?: Emoji) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  children,
  className,
  emoji,
  onSelect,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState<string>("");
  const [value, setValue] = useState<Emoji | undefined>(emoji);

  const handleClose = () => {
    setSearch("");
    onClose();
  };

  const handleSelect = (emoji: Emoji) => {
    setValue(emoji);
    setSearch("");
    onClose();
  };

  useEffect(() => {
    onSelect?.(value);
  }, [onSelect, value]);

  useEffect(() => {
    setValue(emoji);
  }, [emoji]);

  return (
    <Popover placement="bottom-start" offset={8} isOpen={isOpen} onOpenChange={onOpen} onClose={handleClose}>
      <PopoverTrigger className={className}>{children}</PopoverTrigger>
      <PopoverContent className="p-2">
        <Input
        size="sm"
          type="text"
          placeholder="Search emojis..."
          className="mb-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Picker.Root
          locale={router.locale === "pt-BR" ? "pt" : "en"}
          onEmojiSelect={handleSelect}
          className="isolate flex flex-col bg-none w-fit"
        >
          <Scroll className="w-[300px] h-64">
            <Picker.Viewport
              style={{
                overscrollBehavior: "none",
                scrollbarGutter: "none",
              }}
              className="relative flex-1 p-0 outline-hidden"
            >
              <Picker.Search value={search} hidden />
              <Picker.Loading className="absolute inset-0 flex justify-center items-center text-default-400 text-sm">
                Loading…
              </Picker.Loading>
              <Picker.Empty className="absolute inset-0 flex justify-center items-center text-default-400 text-sm">
                {({ search }) => <>No emoji found for &quot;{search}&quot;</>}
              </Picker.Empty>
              <Picker.List
                className="select-none"
                style={{
                  overscrollBehavior: "contain",
                }}
                components={{
                  CategoryHeader: ({ category, ...props }) => (
                    <div
                      {...props}
                      className="bg-none px-3 pt-1 font-medium text-default-600 text-xs"
                    >
                      {category.label}
                    </div>
                  ),
                  Row: ({ children, ...props }) => (
                    <div
                      {...props}
                      style={{
                        contain: "none",
                        display: "flex",
                      }}
                      className="bg-none px-1.5 contain-none"
                    >
                      {children}
                    </div>
                  ),
                  Emoji: ({ emoji, ...props }) => (
                    <button
                      className={cn(
                        "flex justify-center items-center hover:bg-default-200 active:bg-default-50 rounded-md size-8 text-lg",
                        "transition-all duration-200 focus:ring-2 focus:ring-primary !outline-none"
                      )}
                      {...props}
                      tabIndex={0}
                    >
                      {emoji.emoji}
                    </button>
                  ),
                }}
              />
            </Picker.Viewport>
          </Scroll>
          <div
            className={cn(
              "flex items-center gap-1 p-2 px-1.5 pb-0 w-full min-w-0 max-w-full"
            )}
            data-slot="emoji-picker-footer"
          >
            <Picker.ActiveEmoji>
              {({ emoji }) =>
                emoji ? (
                  <>
                    <div className="flex flex-none justify-center items-center size-7 text-lg">
                      {emoji.emoji}
                    </div>
                    <span className="text-default-400 text-xs truncate">
                      {emoji.label}
                    </span>
                  </>
                ) : (
                  <span className="flex items-center h-7 text-default-500 text-muted-foreground text-xs truncate">
                    Select an emoji…
                  </span>
                )
              }
            </Picker.ActiveEmoji>
          </div>
        </Picker.Root>
      </PopoverContent>
    </Popover>
  );
};
