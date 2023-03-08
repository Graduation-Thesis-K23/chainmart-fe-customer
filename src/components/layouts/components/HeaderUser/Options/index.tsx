import React, { memo } from "react";
import Link from "next/link";

import { default as translate } from "~/hooks/useLocales";

const Options: React.FC<{
  href: string;
  optionKey: string;
}> = ({ href, optionKey }) => {
  const handleLogout = () => {
    document.cookie =
      "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'";
    document.location.href = "/";
  };

  if (href === "/logout") {
    return (
      <button
        style={{
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        {translate(optionKey)}
      </button>
    );
  }

  return (
    <Link href={href} prefetch={false}>
      <span>{translate(optionKey)}</span>
    </Link>
  );
};

export default memo(Options);
