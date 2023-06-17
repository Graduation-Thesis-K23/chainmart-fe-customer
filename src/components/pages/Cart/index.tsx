import React from "react";

import Breadcrumb from "./components/Breadcrumb";
import Products from "./components/Products";
import withAuth from "~/hocs/withAuth";

const Cart = () => {
  return (
    <>
      <Breadcrumb />
      <Products />
    </>
  );
};

export default withAuth(Cart);
