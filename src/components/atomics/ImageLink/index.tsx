// libs
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Props {
  href: string;
  src: string | StaticImageData;
  width: number;
  height: number;
  alt: string;
}

const ImageLink = ({ href, src, width, height, alt }: Props) => {
  return (
    <Link href={href}>
      <a
        style={{
          display: "inline-block",
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <Image src={src} width={width} height={height} alt={alt} />
      </a>
    </Link>
  );
};

export default ImageLink;
