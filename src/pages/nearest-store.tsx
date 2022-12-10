import React from "react";

import MainLayout from "~layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

const Nearest: NextPageWithLayout = () => {
  return <p>Nearest</p>;
};

Nearest.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Nearest;
