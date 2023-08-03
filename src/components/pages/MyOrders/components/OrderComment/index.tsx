import {
  Modal,
  Rate,
  Upload,
  UploadFile,
  UploadProps,
  Image as ImageAntd,
} from "antd";
import React, { FC, memo, useMemo, useState } from "react";
// import Image from "next/image";
import ImgCrop from "antd-img-crop";

import Translate from "~/components/commons/Translate";
import styles from "./OrderComment.module.scss";
import useTranslate from "~/hooks/useLocales";
import { OrderProductType } from "~/shared";
// import getS3Image from "~/helpers/get-s3-image";
import { RcFile } from "antd/es/upload";

import { RateType } from "../OrderCommentModal";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const OrderComment: FC<{
  product: OrderProductType;
  setRates: React.Dispatch<React.SetStateAction<RateType[]>>;
  rates: RateType[];
}> = ({ product, setRates, rates }) => {
  const [star, setStar] = useState(5);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const star1Text = useTranslate("purchase.star1");
  const star2Text = useTranslate("purchase.star2");
  const star3Text = useTranslate("purchase.star3");
  const star4Text = useTranslate("purchase.star4");
  const star5Text = useTranslate("purchase.star5");

  const desc = useMemo(() => {
    return [star1Text, star2Text, star3Text, star4Text, star5Text];
  }, [star1Text, star2Text, star3Text, star4Text, star5Text]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    const rate = rates.find((rate) => rate.id === product.id);
    if (rate) {
      rate.images = newFileList.map((file) => file.originFileObj as RcFile);
      setRates([...rates]);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handleSetStar = (star: number) => {
    setStar(star);
    const rate = rates.find((rate) => rate.id === product.id);
    if (rate) {
      rate.star = star;
      setRates([...rates]);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rate = rates.find((rate) => rate.id === product.id);
    if (rate) {
      rate.comment = e.target.value;
      setRates([...rates]);
    }
  };

  return (
    <li className={styles["item"]} key={product.id}>
      <div className={styles["item__product"]}>
        <div className={styles["item__product__image"]}>
          {/*  <Image
            src={getS3Image(product.image)}
            alt={product.name}
            width={72}
            height={72}
          /> */}
        </div>
        <p className={styles["item__product__name"]}>{product.name}</p>
      </div>
      <div className={styles["item__star"]}>
        <div className={styles["item__star__title"]}>
          <Translate textKey="purchase.ratingTitle" />
        </div>
        <div className={styles["item__star__vote"]}>
          <Rate onChange={handleSetStar} value={star} allowClear={false} />
          {star ? <span className="ant-rate-text">{desc[star - 1]}</span> : ""}
        </div>
      </div>
      <div className={styles["item__comment"]}>
        <textarea
          className={styles["item__comment__input"]}
          onChange={handleCommentChange}
        />
      </div>
      <div>
        <ImgCrop grid>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={handlePreview}
          >
            {fileList.length < 2 && "+ Upload"}
          </Upload>
        </ImgCrop>
        <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
          <ImageAntd alt="example" src={previewImage} />
        </Modal>
      </div>
    </li>
  );
};

export default memo(OrderComment);
