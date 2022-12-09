import React, { memo } from "react";
import Image from "next/image";

const ImageSlider: React.FC<{
  src: string;
  onMouseEnter: () => void;
}> = ({ src, onMouseEnter }) => {
  return (
    <Image
      src={src}
      alt="product-image"
      width={65}
      height={65}
      objectFit="contain"
      onMouseEnter={onMouseEnter}
      style={{
        cursor: "pointer",
      }}
    />
  );
};

export default memo(ImageSlider);
