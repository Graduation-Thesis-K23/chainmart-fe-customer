import React from "react";
import { AUTH_LAYOUT } from "~/constants";

import LoginScreen from "~pages/Login";
import type { NextPageWithLayout } from "./_app";

const Login: NextPageWithLayout = () => <LoginScreen />;

Login.layout = AUTH_LAYOUT;

export default Login;
