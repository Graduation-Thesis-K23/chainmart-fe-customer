import React, { FC, memo } from "react";
import Image from "next/image";
import { Dropdown, MenuProps, Avatar } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import styles from "./HeaderUser.module.scss";
import Options from "./Options";
import { User } from "~/redux";
import getS3Image from "~/helpers/get-s3-image";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Options href="/settings" optionKey="header.topRight.myAccount" />,
    icon: <UserOutlined />,
  },
  {
    key: "2",
    label: (
      <Options href="/me/my-orders" optionKey="header.topRight.myOrders" />
    ),
    icon: <ShoppingCartOutlined />,
  },
  {
    key: "3",
    label: <Options href="/logout" optionKey="header.topRight.logout" />,
    icon: <LogoutOutlined />,
  },
];

const HeaderUser: FC<{ user: User }> = ({ user }) => {
  return (
    <div id="header-user" className={styles["user"]}>
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        getPopupContainer={() =>
          document.getElementById("header-user") as HTMLElement
        }
      >
        <div className={styles["header-user"]}>
          <span className={styles["header-user_name"]}>{user.name}</span>
          {user.avatar ? (
            <Image
              className={styles["header-user_image"]}
              src={getS3Image(user.avatar)}
              width={26}
              height={26}
              alt="avatar"
            />
          ) : (
            <Avatar size={26} gap={1}>
              {user.name[0]}
            </Avatar>
          )}
        </div>
      </Dropdown>
    </div>
  );
};

export default memo(HeaderUser);
