import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spin } from "antd";
import PageTitle from "../../layout/components/content/page-title";
import CardComponent from "../components/card";
import httpRequest from "@/utils/axios";

const endpoint = "api/dashboard";
export default function Home() {
  const [data, setData] = useState({});
  const [antLoading, setAntLoading] = useState(false);

  const getData = async () => {
    setAntLoading(true);
    await httpRequest({
      url: endpoint,
      method: "get",
    })
      .then((response) => {
        console.log(response?.data?.data);
        setData(response?.data?.data);
      })
      .finally(() => {
        setAntLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Row gutter={[32, 32]}>
      <PageTitle pageTitle="Home Page" />
      {antLoading ? (
        <Col span={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin />
          </div>
        </Col>
      ) : (
        <Col span={24}>
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <CardComponent
                title="Jumlah Data Karyawan"
                count={data.karyawan}
              />
            </Col>
            <Col span={12}>
              <CardComponent title="Jumlah Data Jabatan" count={data.jabatan} />
            </Col>
            <Col span={12}>
              <CardComponent
                title="Jumlah Komponen Gaji"
                count={data.komponen}
              />
            </Col>
            <Col span={12}>
              <CardComponent title="Jumlah Pengguna" count={data.pengguna} />
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
}
