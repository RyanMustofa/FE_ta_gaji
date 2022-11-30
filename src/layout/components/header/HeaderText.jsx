import { Col } from "antd";
import { Document, Upload } from "react-iconly";

export default function HeaderText() {
  return (
    <Col xl={16} lg={14} className="hp-header-left-text hp-d-flex-center">
      <Document
        set="curved"
        size="large"
        className="remix-icon hp-update-icon hp-text-color-primary-1 hp-text-color-dark-0 hp-p-4 hp-bg-color-primary-4 hp-bg-color-dark-70"
      />

      <p className="hp-header-left-text-item hp-input-label hp-text-color-black-100 hp-text-color-dark-0 hp-ml-16 hp-mb-0"></p>
    </Col>
  );
}
