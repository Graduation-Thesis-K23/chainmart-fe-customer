import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { GlobalOutlined } from "@ant-design/icons";

import MultiLanguage from "~/components/commons/MultiLanguage";

import logoSquare from "~/assets/images/logo-square.png";
import styles from "./SettingLayout.module.scss";
import Loading from "~/components/atomics/Loading";
import { ASYNC_STATUS } from "~/redux/constants";
import { useAppSelector } from "~/redux";
import { Avatar } from "antd";

const SettingLayout: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { status, data } = useAppSelector((state) => state.user);

  if (status !== ASYNC_STATUS.SUCCEED) {
    return (
      <>
        {children}
        <Loading />
      </>
    );
  }

  return (
    <>
      <header className={styles["header"]}>
        <Link href="/">
          <Image src={logoSquare} width={50} height={50} alt="logo" priority />
        </Link>
        <div className={styles["header_right"]}>
          <GlobalOutlined />
          <div className={styles["header_language"]} id="language">
            <MultiLanguage
              container={() =>
                document.getElementById("language") as HTMLElement
              }
            />
          </div>
          <div className={styles["header_vertical"]}></div>
          {data.avatar ? (
            <Image
              className={styles["header_right_avatar"]}
              src={data.avatar}
              width={32}
              height={32}
              alt="avatar"
            />
          ) : (
            <Avatar size={32} gap={1}>
              {data.name[0]}
            </Avatar>
          )}
        </div>
      </header>
      {children}
    </>
  );
};

export default memo(SettingLayout);
