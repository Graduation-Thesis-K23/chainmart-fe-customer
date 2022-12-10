import React from "react";

import MainLayout from "~layouts/MainLayout";
import Page404Screen from "~pages/404";
import type { NextPageWithLayout } from "./_app";

const Page500: NextPageWithLayout = () => <Page404Screen />;

Page500.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page500;
