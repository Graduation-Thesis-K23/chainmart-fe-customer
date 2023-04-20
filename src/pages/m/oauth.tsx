import { NextPage, NextPageContext } from "next";
import React, { useEffect } from "react";

import Loading from "~/components/atomics/Loading";
import instance from "~/services/axios-instance";

const OAuth: NextPage<{ refresh_token: string }> = ({ refresh_token }) => {
  useEffect(() => {
    const getAccessToken = async () => {
      const response = await instance.get(
        "/api/auth/oauth?refresh_token=" + refresh_token
      );

      console.log(response);
    };

    getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading />;
};

OAuth.getInitialProps = async (ctx: NextPageContext) => {
  const refresh_token: string = ctx.query.refresh_token as string;

  return { refresh_token };
};

export default OAuth;
