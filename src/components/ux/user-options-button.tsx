import { Logout2, Pen, User as UserIcon } from "@solar-icons/react";
import IconOption from "../ui/icon-option";
import { useUser } from "@/contexts/auth-provider";
import { useTranslations } from "next-intl";
import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Avatar } from "../avatar";
import ThemeUserFeedback from "./theme-user-feedback";
import { useTheme } from "next-themes";

const UserOptionsButton: React.FC = () => {
  const t = useTranslations();
  const { logged, user, logout } = useUser();
  const { theme, setTheme } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!logged) {
    return <LazyUserOptionsMenu />;
  }

  return (
    <Popover radius="sm" placement="bottom-end" offset={8}>
      <PopoverTrigger>
        <Button
          radius="md"
          className="data-[aria-expanded=true]:blur-md"
          isIconOnly
        >
          <Avatar src={user?.profile_picture} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "flex flex-col gap-0 p-1 w-full min-w-44 h-m text-gray-700 dark:text-gray-200 transition-all in",
          isModalOpen && "opacity-25 duration-100 pointer-events-none"
        )}
      >
        <Skeleton className="rounded-lg w-full h-7" isLoaded={!!user}>
          <p className="p-1 w-full text-start">{user?.name}</p>
        </Skeleton>
        <Divider
          className={cn(
            "transition-opacity duration-200",
            !user ? "opacity-0" : "opacity-100"
          )}
        />
        <IconOption
          href={`/user/${user?.username}`}
          disabled={!user}
          icon={<UserIcon />}
        >
          {t("UI.redirects.profile")}
        </IconOption>
        <IconOption
          href="/post"
          className="md:hidden flex"
          icon={<Pen weight="LineDuotone" size={22} />}
        >
          {t("UI.redirects.new_post")}
        </IconOption>
        <IconOption
          onClick={toggleTheme}
          className="md:hidden flex"
          icon={<ThemeUserFeedback />}
        >
          {t("UI.redirects.change_theme")}
        </IconOption>
        <IconOption
          onClick={logout}
          href="/login"
          icon={<Logout2 />}
          confirmAction
          confirmActionInfo={{
            actionConfirmTitle: t("UI.redirects.logout"),
            onConfirmModalChanged: setIsModalOpen,
          }}
        >
          {t("UI.redirects.logout")}
        </IconOption>
      </PopoverContent>
    </Popover>
  );
};

export const LazyUserOptionsMenu: React.FC = () => {
  return (
    <Button isIconOnly>
      <Spinner color="current" className="text-default-500 scale-75" />
    </Button>
  );
};

export default UserOptionsButton;
