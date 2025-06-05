import {
  Avatar as HeroUIAvatar,
  AvatarProps as HeroUIAvatarProps,
} from "@heroui/react";
import { User } from "@solar-icons/react";
import { IconProps } from "@solar-icons/react/lib/types";
import { PhotoProvider, PhotoView } from "react-photo-view";

export interface AvatarProps extends HeroUIAvatarProps {
  fallbackIconProps?: IconProps;
}

export const Avatar: React.FC<AvatarProps> = ({
  fallbackIconProps,
  ...props
}) => {
  const component = (
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
  return (
    <>
      {props.src ? (
        <PhotoProvider >
          <PhotoView src={props.src}>{component}</PhotoView>
        </PhotoProvider>
      ) : (
        component
      )}
    </>
  );
};
