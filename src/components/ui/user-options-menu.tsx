import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@heroui/react";
import { useAuth } from "@/contexts/auth-provider";
import userPicture from "@public/img/user-default.png";

interface UserOptionsMenuProps {
  children?: React.ReactNode;
}

const UserOptionsMenu: React.FC<UserOptionsMenuProps> = ({
  children,
}: UserOptionsMenuProps) => {
  const { user } = useAuth();

  if (!user) {
    return <LazyUserOptionsMenu />;
  }

  return (
    <Popover radius="sm" placement="bottom-end">
      <PopoverTrigger>
        <Button
          as={Button}
          radius="md"
          className="data-[aria-expanded=true]:blur-md"
          isIconOnly
        >
          <Avatar
            src={user?.profile_picture}
            radius="md"
            fallback={<Avatar src={userPicture.src} radius="md" />}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-0 p-1 w-full min-w-44 h-min text-gray-700 dark:text-gray-200">
        <p className="p-1 w-full text-start">{user.name}</p>
        <hr className="bg-black mb-1 w-full h-px" />
        {children}
      </PopoverContent>
    </Popover>
  );
};

export const LazyUserOptionsMenu: React.FC = () => {
  return (
    <Button isIconOnly>
      <Spinner size="sm" color="default" />
    </Button>
  );
};

export default UserOptionsMenu;
