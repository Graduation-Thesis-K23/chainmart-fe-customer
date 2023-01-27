import React, { memo } from "react";
import Image from "next/image";
import { Dropdown, MenuProps } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import styles from "./HeaderUser.module.scss";
import Options from "./Options";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Options href="/me" optionKey="header.topRight.myAccount" />,
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

const HeaderUser = () => {
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
          <span className={styles["header-user_name"]}>hiepnguyen6014</span>
          <Image
            className={styles["header-user_image"]}
            src="https://picsum.photos/26"
            width={26}
            height={26}
            alt="avatar"
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default memo(HeaderUser);
