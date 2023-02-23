import React, { memo, useState } from "react";
import Image from "next/image";
import { CameraOutlined } from "@ant-design/icons";

import ChangeAvatarModal from "../ChangeAvatar";
import ProfileForm from "../ProfileForm";
import styles from "./ProfileSettings.module.scss";

const ProfileSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClickChangeAvatar = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles["profile_settings"]}>
      <div className={styles["profile_settings_avatar"]}>
        <Image
          className={styles["profile_settings_avatar_image"]}
          src="https://lh3.googleusercontent.com/a/AEdFTp51xsRcGBKmxFF50oQEUWJXtnMZ0FHt7IAcSCMh=s96-c"
          width={160}
          height={160}
          alt="avatar"
          priority
        />
        <CameraOutlined
          className={styles["profile_settings_avatar_icon"]}
          onClick={onClickChangeAvatar}
        />
      </div>
      <ChangeAvatarModal state={{ isModalOpen, setIsModalOpen }} />

      <ProfileForm />
    </div>
  );
};

export default memo(ProfileSettings);
