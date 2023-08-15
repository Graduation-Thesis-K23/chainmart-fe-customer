import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Card, Divider, Space, Typography } from "antd";
import { toast } from "react-toastify";

import styles from "./Momo.module.scss";
import { ordersSocket } from "~/apis/socket.io-instance";
import {
  CurrentBankingOrder,
  findBankingOrderById,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import useTranslate from "~/hooks/useLocales";
import Timer from "./components/Timer";
import { QRBanking } from "./components/QRBanking";
import { SuccessBanking } from "./components/SuccessBanking";
import { FailedBanking } from "./components/FailedBanking";
import withAuth from "~/hocs/withAuth";

const { Text } = Typography;

const MomoScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  // const { currentBankingOrder } = useAppSelector((state) => state.checkout);

  const momoRemainText = useTranslate("momo.remain");

  const [calledPush, setCalledPush] = useState(false);
  const [isConnected, setIsConnected] = useState(ordersSocket.connected);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [currentBankingOrder, setCurrentBankingOrder] =
    useState<CurrentBankingOrder | null>(null);

  console.log("currentBankingOrder:", isConnected);

  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      if (calledPush) {
        return; // no need to call router.push() again
      }
      Router.push("/");
      setCalledPush(true);
      return;
    }

    async function fetchBankingOrder() {
      try {
        const response = await dispatch(findBankingOrderById(id as string));
        if ("error" in response) {
          if (calledPush) {
            return; // no need to call router.push() again
          }
          Router.push("/");
          setCalledPush(true);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setCurrentBankingOrder(response.payload as any);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBankingOrder();
  }, [id]);

  const expirationTime = currentBankingOrder?.expiration_timestamp
    ? new Date(currentBankingOrder?.expiration_timestamp)
    : null;
  console.log("expirationTime:", expirationTime);

  const qrcodeValue =
    (global.window &&
      currentBankingOrder?.id &&
      window?.location.host + `/payment?order_id=${currentBankingOrder?.id}`) ||
    "";

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      toast.error("Oh no! Socket disconnected");
    }

    function onOrderUpdated(status: string) {
      console.log("Order status:", status);
      if (status === "Approved") {
        setIsSuccess(true);
      } else {
        setIsFailed(true);
      }
    }

    ordersSocket.on("connect", onConnect);
    ordersSocket.on("disconnect", onDisconnect);
    ordersSocket.on(user.data.username, onOrderUpdated);

    return () => {
      ordersSocket.off("connect", onConnect);
      ordersSocket.off("disconnect", onDisconnect);
      ordersSocket.off(user.data.username, onOrderUpdated);
    };
  }, [user]);

  return (
    <div className={styles["momo"]}>
      <Card className={styles["momo__card"]}>
        <Space direction="horizontal" align="end">
          <Text type="secondary">{momoRemainText + ":"}</Text>
          {expirationTime && (
            <Timer
              expiryTimestamp={expirationTime}
              orderId={currentBankingOrder?.id || ""}
              isFinished={isSuccess || isFailed}
              setIsFailed={setIsFailed}
            />
          )}
        </Space>
        <Divider style={{ marginTop: 10 }} />

        {isSuccess ? (
          <SuccessBanking />
        ) : isFailed ? (
          <FailedBanking />
        ) : (
          <QRBanking qrcodeValue={qrcodeValue} />
        )}
      </Card>
    </div>
  );
};

export default withAuth(MomoScreen);
