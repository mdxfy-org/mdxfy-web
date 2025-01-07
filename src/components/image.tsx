import React, { useState } from "react";
import NextJsImage, {ImageProps as NextJsImageProps} from "next/image";

export interface ImageProps extends NextJsImageProps {
  src: string;
  fallbackSrc: string;
}

const Image = ({
  src,
  fallbackSrc,
  ...props
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <NextJsImage
      {...props}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default Image;
