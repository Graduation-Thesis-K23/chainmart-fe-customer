import React, { memo } from "react";
import Image from "next/image";
import { Dropdown, MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";

import styles from "./HeaderLogin.module.scss";
import { default as translate } from "~/hooks/useTranslate";

/* const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Link href="/me" prefetch={false}>
        <a>
          <span>{translate("header.topRight.myAccount")}</span>
        </a>
      </Link>
    ),
    icon: <DownOutlined />,
  },
  {
    key: "2",
    label: (
      <Link href="/me/my-orders" prefetch={false}>
        <a>
          <span>{translate("header.topRight.myOrders")}</span>
        </a>
      </Link>
    ),
    icon: <DownOutlined />,
  },
  {
    key: "3",
    label: (
      <Link href="logout" prefetch={false}>
        <a>
          <span>{translate("header.topRight.logout")}</span>
        </a>
      </Link>
    ),
    icon: <DownOutlined />,
  },
];
 */
const HeaderAvatar = () => {
  const logged = true;

  return (
    <div className={styles["auth-wrapper"]}>
      {logged && (
        <div id="profile">
          {/*  <Dropdown
            menu={{ items }}
            placement="bottomRight"
            getPopupContainer={() =>
              document.getElementById("profile") as HTMLElement
            }
          >
            <div className={styles["profile-wrapper"]}>
              <Image
                className={styles["auth-avatar"]}
                src="/avt.webp"
                width={32}
                height={32}
                alt="avatar"
              />
            </div>
          </Dropdown> */}
          <div className={styles["profile-wrapper"]}>
            hiepnguyen6014
            <Image
              className={styles["auth-avatar"]}
              src="/avt.webp"
              width={32}
              height={32}
              alt="avatar"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(HeaderAvatar);
