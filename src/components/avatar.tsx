import {
  Avatar as HeroUIAvatar,
  AvatarProps as HeroUIAvatarProps,
} from "@heroui/react";
import { User } from "@solar-icons/react";

export const Avatar: React.FC<HeroUIAvatarProps> = ({ ...props }) => {
  return (
    <HeroUIAvatar
      fallback={
        <User weight="Bold" size={36} className="text-default-500" />
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
