import React from "react";
import HeaderUser from "../HeaderUser";
import HeaderLogin from "../HeaderLogin";
import { useAppSelector } from "~/redux";
import { ASYNC_STATUS } from "~/redux/constants";

const HeaderAuth = () => {
  const { status, data } = useAppSelector((state) => state.user);

  return (
    <>
      {status === ASYNC_STATUS.SUCCEED ? (
        <HeaderUser user={data} />
      ) : (
        <HeaderLogin />
      )}
    </>
  );
};

export default HeaderAuth;
