import React, { memo } from "react";
import { Upload, Modal } from "antd";
import ImgCrop from "antd-img-crop";
import { PictureOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload/interface";

import useTranslate from "~/hooks/useLocales";
import styles from "./ChangeAvatar.module.scss";

const ChangeAvatar: React.FC<{
  state: {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}> = ({ state }) => {
  const editImageText = useTranslate("settings.editImage");
  const saveText = useTranslate("settings.save");
  const cancelText = useTranslate("settings.cancel");
  const dragOrClickText = useTranslate("settings.dropOrClick");

  const onChange: UploadProps["onChange"] = ({ file }) => {
    state.setIsModalOpen(false);
    if (file.status === "done") {
      console.log(file.originFileObj);
    }
  };

  return (
    <Modal
      open={state.isModalOpen}
      onCancel={() => state.setIsModalOpen(false)}
      footer={null}
      centered
      closable={false}
      width={700}
    >
      <ImgCrop
        rotate
        modalTitle={editImageText}
        grid
        modalWidth={710}
        modalOk={saveText}
        modalCancel={cancelText}
      >
        <Upload.Dragger showUploadList={false} onChange={onChange}>
          <div className={styles["picture"]}>
            <PictureOutlined className={styles["picture-icon"]} />
            <p className={styles["picture-text"]}>{dragOrClickText}</p>
          </div>
        </Upload.Dragger>
      </ImgCrop>
    </Modal>
  );
};

export default memo(ChangeAvatar);
