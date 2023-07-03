import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import Loading from "~/components/atomics/Loading";

import { checkCookieToken, useAppDispatch, useAppSelector } from "~/redux";
import { ASYNC_STATUS } from "~/redux";

const withAuth = (Component: FC) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (user.status === ASYNC_STATUS.IDLE) {
        dispatch(checkCookieToken());
      }
    }, [dispatch, user.status]);

    if (
      user.status === ASYNC_STATUS.IDLE ||
      user.status === ASYNC_STATUS.LOADING
    ) {
      return <Loading display />;
    }

    if (user.status === ASYNC_STATUS.FAILED) {
      router.push("/login");
      return null;
    }

    return <Component />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
