import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";

import styles from "./Payment.module.scss";
import MomoLogo from "~/assets/images/momo_square_pinkbg.svg";

interface BankingTabProps {
  setIsCheckoutDisabled: Dispatch<SetStateAction<boolean>>;
}

const BankingTab: FC<BankingTabProps> = ({ setIsCheckoutDisabled }) => {
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
        <Image src={MomoLogo} width={60} height={60} alt={"MoMo Logo"} />
        <p>MoMo (Mock)</p>
      </div>
    </div>
  );
};

export default BankingTab;
