import React, { memo } from "react";
import { Upload, Modal } from "antd";
import ImgCrop from "antd-img-crop";
import { PictureOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload/interface";

const ChangeAvatar: React.FC<{
  state: {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}> = ({ state }) => {
  const onChange: UploadProps["onChange"] = ({ file }) => {
    if (file.status === "done") {
      console.log(file.originFileObj);
      state.setIsModalOpen(false);
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
        modalTitle="Chỉnh sửa ảnh"
        grid
        modalWidth={710}
        modalOk={"Huỷ bỏ"}
        modalCancel={"Lưu thay đổi"}
      >
        <Upload.Dragger showUploadList={false} onChange={onChange}>
          <PictureOutlined />
        </Upload.Dragger>
      </ImgCrop>
    </Modal>
  );
};

export default memo(ChangeAvatar);
