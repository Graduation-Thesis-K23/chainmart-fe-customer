import { Modal } from "antd";
import React, { FC, Fragment, memo, useEffect } from "react";

import styles from "./OrderCommentModal.module.scss";
import useTranslate from "~/hooks/useLocales";
import OrderComment from "../OrderComment";
import { OrderProductType } from "~/shared";
import Translate from "~/components/commons/Translate";
import { RcFile } from "antd/es/upload";
import { commentOrder, useAppDispatch } from "~/redux";

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
  order_id: string;
}> = ({ openComment, handleCancelComment, products, order_id }) => {
  const [rates, setRates] = React.useState<RateType[]>([]);

  const dispatch = useAppDispatch();

  const commentTitleText = useTranslate("purchase.commentTitle");

  const handleComment = async () => {
    // create form data from rates
    const commentsPromise = rates.map((rate) => {
      const formData = new FormData();

      if (rate.images) {
        rate.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      if (rate.comment) {
        formData.append("comment", rate.comment);
      }

      formData.append("product_id", rate.id);
      formData.append("star", rate.star.toString());
      formData.append("order_id", order_id);
      return dispatch(commentOrder(formData));
    });

    await Promise.all(commentsPromise);

    handleCancelComment();
  };

  useEffect(() => {
    const newRates = products.map((product) => ({
      id: product.id,
      star: 5,
    }));
    setRates(newRates);
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
