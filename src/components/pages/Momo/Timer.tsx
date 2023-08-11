import React, { FC } from "react";
import { Typography } from "antd";
import { useTimer } from "react-timer-hook";
import { toast } from "react-toastify";

import { cancelBankingOrder, useAppDispatch } from "~/redux";

const { Title } = Typography;

interface TimerProps {
  expiryTimestamp: Date;
  orderId: string;
}

const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");

const Timer: FC<TimerProps> = ({ expiryTimestamp, orderId }) => {
  const dispatch = useAppDispatch();

  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: async () => {
      toast.error("Sorry! Out of time to make the payment");
      await dispatch(cancelBankingOrder(orderId));
    },
  });

  const colorType = minutes < 1 && seconds < 30 ? "danger" : "success";

  return (
    <Title level={4} style={{ marginBottom: 0 }} type={colorType}>
      {`${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`}
    </Title>
  );
};

export default Timer;
