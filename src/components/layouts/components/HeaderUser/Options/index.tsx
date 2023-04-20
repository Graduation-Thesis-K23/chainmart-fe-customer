import React, { memo } from "react";
import Link from "next/link";

import { default as translate } from "~/hooks/useLocales";
import { logout, useAppDispatch } from "~/redux";

const Options: React.FC<{
  href: string;
  optionKey: string;
}> = ({ href, optionKey }) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());

    window.location.href = "/";
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
