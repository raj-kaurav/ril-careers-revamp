import Image from "next/image";
import type { ImageAsset } from "@/data/images";
import { Parallax } from "@/components/motion/Parallax";
import { cn } from "@/lib/utils";

/**
 * A photograph that fills its frame. The frame's shape comes from the caller
 * (aspect ratio or explicit height) so every chapter can crop differently.
 */
export function Photo({
  image,
  sizes,
  className,
  imageClassName,
  preload,
  parallax,
  decorative,
}: {
  image: ImageAsset;
  sizes: string;
  className?: string;
  imageClassName?: string;
  preload?: boolean;
  /** Drift distance in % of frame height; omit for a static image. */
  parallax?: number;
  /** Set when adjacent text already describes the image. */
  decorative?: boolean;
}) {
  const img = (
    <Image
      src={image.src}
      alt={decorative ? "" : image.alt}
      fill
      sizes={sizes}
      preload={preload}
      className={cn("object-cover", imageClassName)}
      style={{ objectPosition: image.focus }}
    />
  );

  if (parallax) {
    return (
      <Parallax distance={parallax} className={className}>
        {img}
      </Parallax>
    );
  }
  return <div className={cn("relative overflow-hidden", className)}>{img}</div>;
}
