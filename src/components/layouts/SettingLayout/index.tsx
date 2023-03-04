import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { GlobalOutlined } from "@ant-design/icons";

import MultiLanguage from "~/components/commons/MultiLanguage";

import logoSquare from "~/assets/images/logo-square.png";
import styles from "./SettingLayout.module.scss";

const SettingLayout: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
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
          <Image
            className={styles["header_right_avatar"]}
            src="https://lh3.googleusercontent.com/a/AEdFTp51xsRcGBKmxFF50oQEUWJXtnMZ0FHt7IAcSCMh=s96-c"
            width={32}
            height={32}
            alt="avatar"
          />
        </div>
      </header>
      {children}
    </>
  );
};

export default memo(SettingLayout);
