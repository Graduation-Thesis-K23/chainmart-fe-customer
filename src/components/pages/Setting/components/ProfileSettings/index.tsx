import React, { memo, useState } from "react";
import Image from "next/image";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

import ChangeAvatarModal from "../ChangeAvatar";
import ProfileForm from "../ProfileForm";
import styles from "./ProfileSettings.module.scss";
import { useAppSelector } from "~/redux";
import getS3Image from "~/helpers/get-s3-image";

const ProfileSettings: React.FC<{
  id: string;
}> = ({ id }) => {
  const { data } = useAppSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClickChangeAvatar = () => {
    setIsModalOpen(true);
  };

  return (
    <div id={id} className={styles["profile_settings"]}>
      <div className={styles["profile_settings_inner"]}>
        <div className={styles["profile_settings_avatar"]}>
          {data.avatar ? (
            <Image
              className={styles["profile_settings_avatar_image"]}
              src={getS3Image(data.avatar)}
              width={160}
              height={160}
              alt="avatar"
              placeholder="blur"
              blurDataURL={getS3Image(data.avatar)}
              priority
            />
          ) : (
            <Avatar size={160} icon={<UserOutlined />} />
          )}

          <CameraOutlined
            className={styles["profile_settings_avatar_icon"]}
            onClick={onClickChangeAvatar}
          />
        </div>
        <ChangeAvatarModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <ProfileForm />
      </div>
    </div>
  );
};

export default memo(ProfileSettings);
