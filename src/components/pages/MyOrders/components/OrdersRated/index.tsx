import React, { Fragment, memo, useEffect } from "react";
import instance from "~/apis/axios-instance";
import OrdersEmpty from "../OrdersEmpty";
import RatingItem from "./RatingItem";

export interface RateType {
  id: string;
  created_at: Date;
  images: string[];
  star: number;
  comment?: string;
  product: {
    name: string;
    price: number;
    slug: string;
  };
}

const OrdersRated = () => {
  const [comments, setComments] = React.useState<RateType[]>([]);

  useEffect(() => {
    const fetchOrdersRated = async () => {
      const comments: RateType[] = await instance.get("/api/comments");

      setComments(comments);
    };

    fetchOrdersRated();
  }, []);

  return (
    <div>
      {comments.length > 0 ? (
        <div>
          {comments.map((order) => (
            <Fragment key={order.id}>
              <RatingItem comment={order} />
            </Fragment>
          ))}
        </div>
      ) : (
        <OrdersEmpty />
      )}
    </div>
  );
};

export default memo(OrdersRated);
