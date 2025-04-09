/* eslint-disable @next/next/no-img-element */
import React, { useState, memo, useEffect } from "react";
import { Skeleton } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc: string;
  className?: string;
}

const Image: React.FC<ImageProps> = memo(
  ({
    src,
    alt,
    fallbackSrc,
    className,
    width,
    height,
    onClick,
    ...props
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imgSrc, setImgSrc] = useState(src);

    const handleImageError = () => {
      console.log('Image failed to load, using fallback source');
      setImgSrc(fallbackSrc);
    };

    const handleImageLoad = () => {
      console.log('Image loaded successfully');
      setIsLoaded(true);
    };

    useEffect(() => {
      if (src !== imgSrc) {
        setImgSrc(src);
        setIsLoaded(false);
      }
    }, [src, imgSrc]);

    return (
      <Skeleton
        isLoaded={isLoaded}
        className={cn(
          `w-[${width}px] h-[${height}px] rounded-xl`,
        )}
        aria-label={!isLoaded ? "Image loading" : undefined}
        onClick={onClick}
      >
        <img
          className={cn(`max-w-[${width}px] max-h-[${height}px]`, className)}
          alt={alt || "Image with no description available"}
          src={imgSrc}
          onError={handleImageError}
          onLoad={handleImageLoad}
          width={width}
          height={height}
          {...props}
        />
      </Skeleton>
    );
  }
);

Image.displayName = "Image";

export default Image;
