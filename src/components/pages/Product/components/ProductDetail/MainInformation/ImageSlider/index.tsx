import React from "react";
import Image from "next/image";

const ImageSlider: React.FC<{
  src: string;
}> = ({ src }) => {
  return <Image src={src} alt="product-image" width={65} height={65} />;
};

export default ImageSlider;
