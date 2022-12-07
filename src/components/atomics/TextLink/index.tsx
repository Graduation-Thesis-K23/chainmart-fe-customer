// libs
import React, { memo } from "react";
import Link from "next/link";

interface Props {
  href: string | object;
  text: string;
  blank?: boolean;
}

const TextLink = ({ href, text, blank }: Props) => {
  return (
    <Link href={href} prefetch={false}>
      <a
        style={{
          color: "inherit",
        }}
        target={blank ? "_blank" : "_self"}
      >
        <span>{text}</span>
      </a>
    </Link>
  );
};

export default memo(TextLink);
