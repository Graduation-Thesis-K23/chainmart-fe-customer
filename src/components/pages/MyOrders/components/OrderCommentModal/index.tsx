import { Modal } from "antd";
import React, { FC, Fragment, memo, useEffect } from "react";

import styles from "./OrderCommentModal.module.scss";
import useTranslate from "~/hooks/useLocales";
import OrderComment from "../OrderComment";
import { OrderProductType } from "~/shared";
import Translate from "~/components/commons/Translate";
import { RcFile } from "antd/es/upload";

export interface RateType {
  id: string;
  star: number;
  comment?: string;
  images?: RcFile[];
}

const OrderCommentModal: FC<{
  openComment: boolean;
  handleCancelComment: () => void;
  products: OrderProductType[];
}> = ({ openComment, handleCancelComment, products }) => {
  const [rates, setRates] = React.useState<RateType[]>([]);

  const commentTitleText = useTranslate("purchase.commentTitle");

  const handleComment = () => {
    // create form data from rates
    const formData = new FormData();
    rates.forEach((rate) => {
      formData.append("product_id[]", rate.id);
      formData.append("star[]", rate.star.toString());
      formData.append("comment[]", rate.comment || "");
      if (rate.images) {
        rate.images.forEach((image) => {
          formData.append("images[]", image);
        });
      }
    });

    // print form data key and value
    formData.forEach((value, key) => {
      console.log(key, value);
    });
  };

  useEffect(() => {
    const newRates = products.map((product) => ({
      id: product.id,
      star: 5,
    }));
    setRates(newRates);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      open={openComment}
      onCancel={handleCancelComment}
      title={commentTitleText}
      footer={null}
      width={700}
    >
      <div className={styles["comments"]}>
        <div className={styles["comments__header"]} />
        <ul className={styles["comments__list"]}>
          {products.map((product) => (
            <Fragment key={product.id}>
              <OrderComment
                product={product}
                setRates={setRates}
                rates={rates}
              />
            </Fragment>
          ))}
        </ul>
        <div className={styles["comments__footer"]}>
          <button
            className={styles["comments__footer__btn"]}
            onClick={handleCancelComment}
            style={{
              backgroundColor: "transparent",
              color: "#000",
            }}
          >
            <Translate textKey="purchase.closeBtn" />
          </button>
          <button
            className={styles["comments__footer__btn"]}
            onClick={handleComment}
          >
            <Translate textKey="purchase.commentBtn" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(OrderCommentModal);
