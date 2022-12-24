import React from "react";

import LoginScreen from "~pages/Login";
import type { NextPageWithLayout } from "./_app";
import MainLayout from "~layouts/MainLayout";

const Login: NextPageWithLayout = () => {
  return <LoginScreen />;
};

Login.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Login;
