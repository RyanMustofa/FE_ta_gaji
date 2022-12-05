import React from "react";
import { Card, Col, Row } from "antd";
import { User } from "react-iconly";

const CardComponent = ({ title, count }) => {
  return (
    <>
      <Card className="hp-border-color-black-40 hp-border-color-dark-80">
        <h4>{title} 🚀</h4>
        <Row align="middle" justify="start">
          <Col md={12} span={24}>
            <span style={{ fontSize: 70, color: "#B2B2B2" }}>{count}</span>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CardComponent;
