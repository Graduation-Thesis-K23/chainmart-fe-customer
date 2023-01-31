import { Row, Col } from "antd";
import React from "react";

import Navigate from "./components/Navigate";
import ProfileSettings from "./components/ProfileSettings";

const Setting = () => (
  <div className="container">
    <Row>
      <Col xs={0} sm={0} md={0} lg={6} xl={6}>
        <Navigate />
      </Col>
      <Col xs={24} sm={24} md={24} lg={18} xl={18}>
        <ProfileSettings />
      </Col>
    </Row>
  </div>
);
export default Setting;
