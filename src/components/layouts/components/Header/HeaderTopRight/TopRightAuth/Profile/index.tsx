// libs
import React from "react";
import Image from "next/image";
import { Dropdown } from "antd";
// components
import ProfileItem from "../ProfileItem";
// others
import styles from "./Profile.module.scss";

const items = [
  {
    key: "1",
    label: <ProfileItem href="/me" textKey="header.topRight.myAccount" />,
  },
  {
    key: "2",
    label: (
      <ProfileItem href="/me/my-orders" textKey="header.topRight.myOrders" />
    ),
  },
  {
    key: "3",
    label: <ProfileItem href="/logout" textKey="header.topRight.logout" />,
  },
];

const Profile = () => {
  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <div className={styles["profile-wrapper"]}>
        <Image
          className={styles["auth-avatar"]}
          src="/avt.webp"
          width={32}
          height={32}
          alt="avatar"
        />
      </div>
    </Dropdown>
  );
};

export default Profile;
