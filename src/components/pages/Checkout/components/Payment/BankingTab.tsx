import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";

import styles from "./Payment.module.scss";
import QRBankingLogo from "~/assets/images/banking-icon.png";
import useTranslate from "~/hooks/useLocales";

interface BankingTabProps {
  setIsCheckoutDisabled: Dispatch<SetStateAction<boolean>>;
}

const BankingTab: FC<BankingTabProps> = ({ setIsCheckoutDisabled }) => {
  const payWithQrCodeText = useTranslate("checkout.qr");
  const [isMomoSelected, setIsMomoSelected] = useState(false);

  useEffect(() => {
    if (isMomoSelected) {
      setIsCheckoutDisabled(false);
    }
  });

  const handleMomoClick = () => {
    setIsCheckoutDisabled((prev) => !prev);
    setIsMomoSelected((prev) => !prev);
  };

  return (
    <div>
      <div
        className={`${styles["momo"]} ${
          isMomoSelected ? styles["momo--selected"] : ""
        }`}
        onClick={handleMomoClick}
      >
        <Image
          src={QRBankingLogo}
          width={60}
          height={60}
          alt={"QR Chainmart Logo"}
        />
        <p>{payWithQrCodeText}</p>
      </div>
    </div>
  );
};

export default BankingTab;
