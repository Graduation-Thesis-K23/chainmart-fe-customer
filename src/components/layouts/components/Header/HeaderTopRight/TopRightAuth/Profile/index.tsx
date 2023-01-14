// libs
import React from "react";
import Image from "next/image";
import { Popover } from "antd";
// components
import ProfileItem from "../ProfileItem";
// others
import styles from "./Profile.module.scss";

const content = (
  <div className={styles["profile-popup"]}>
    <ProfileItem href="/me" textKey="header.topRight.myAccount" />
    <ProfileItem href="/me/my-orders" textKey="header.topRight.myOrders" />{" "}
    <ProfileItem href="/logout" textKey="header.topRight.logout" />
  </div>
);

const Profile = () => {
  return (
    <div id="profile">
      <Popover
        content={content}
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
      </Popover>
    </div>
  );
};

export default Profile;
