import {
  Avatar as HeroUIAvatar,
  AvatarProps as HeroUIAvatarProps,
} from "@heroui/react";
import { User } from "@solar-icons/react";
import { IconProps } from "@solar-icons/react/lib/types";

export interface AvatarProps extends HeroUIAvatarProps {
  fallbackIconProps?: IconProps;
}

export const Avatar: React.FC<AvatarProps> = ({
  fallbackIconProps,
  ...props
}) => {
  return (
    <HeroUIAvatar
      fallback={
        <User
          weight="Bold"
          size={36}
          className="text-default-500"
          {...fallbackIconProps}
        />
      }
      radius="lg"
      alt="Foto de perfil"
      showFallback
      imgProps={{
        loading: "lazy",
      }}
      {...props}
    />
  );
};
