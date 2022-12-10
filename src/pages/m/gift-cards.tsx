import React from "react";

import MainLayout from "~layouts/MainLayout";
import { NextPageWithLayout } from "../_app";

const GiftCards: NextPageWithLayout = () => {
  return (
    <MainLayout>
      <div>Gift Cards</div>
    </MainLayout>
  );
};

GiftCards.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default GiftCards;
