import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import CreditCardImg from "~/assets/images/undraw_plain_credit_card.svg";
import useTranslate from "~/hooks/useLocales";

const PaymentPage = () => {
  const router = useRouter();

  const paymentSuccessText = useTranslate("payment.success");

  const { user_id } = router.query;

  useEffect(() => {
    async function makePayment() {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id }),
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
    makePayment();
  }, [user_id]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: 50,
        color: "#28A745",
      }}
    >
      <Image src={CreditCardImg} width={400} alt={"Credit Card"} />
      <h3>{paymentSuccessText}!</h3>
    </div>
  );
};

export default PaymentPage;
