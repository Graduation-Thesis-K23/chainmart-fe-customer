import React, { ReactElement, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { GlobalOutlined } from "@ant-design/icons";
import { Avatar, Divider, Dropdown, MenuProps } from "antd";

import MultiLanguage from "~/components/commons/MultiLanguage";
import Options from "../components/HeaderUser/Options";

import logoSquare from "~/assets/images/logo-square.png";
import styles from "./SettingLayout.module.scss";
import { useAppSelector } from "~/redux";
import getS3Image from "~/helpers/get-s3-image";

const items: MenuProps["items"] = [
  {
    key: "3",
    label: <Options href="/logout" optionKey="header.topRight.logout" />,
  },
];

const SettingLayout: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { data } = useAppSelector((state) => state.user);

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
          <Dropdown
            menu={{ items }}
            arrow
            placement="bottomRight"
            dropdownRender={(menu) => (
              <div className={styles["menu"]}>
                <div className={styles["menu__inner"]}>
                  <p className={styles["menu__name"]}>{data.name}</p>
                  <p className={styles["menu__username"]}>#{data.username}</p>
                </div>
                <Divider style={{ margin: 0 }} />
                {React.cloneElement(menu as ReactElement)}
              </div>
            )}
          >
            {data.avatar ? (
              <Image
                className={styles["header_right_avatar"]}
                src={getS3Image(data.avatar)}
                width={32}
                height={32}
                alt="avatar"
              />
            ) : (
              <Avatar size={32} gap={1}>
                {data.name[0]}
              </Avatar>
            )}
          </Dropdown>
        </div>
      </header>
      {children}
    </>
  );
};

export default memo(SettingLayout);
