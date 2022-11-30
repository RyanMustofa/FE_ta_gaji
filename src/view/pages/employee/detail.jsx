import { Button, Col, Divider, Image, List, Row, Spin, Typography } from "antd";
import Card from "antd/lib/card/Card";
import React from "react";
import { useEffect } from "react";
import BreadCrumbs from "../../../layout/components/content/breadcrumbs";
import PageTitle from "../../../layout/components/content/page-title";
import query from "../../../utils/query";
import httpRequest from "@/utils/axios";
import { useState } from "react";

const endpoint = "api/karyawan";

const Detail = () => {
  const [antLoading, setAntLoading] = useState(false);
  const getData = async (id) => {
    setAntLoading(true);
    await httpRequest({
      url: endpoint,
      method: "get",
      //   params: meta,
    })
      .then((response) => {
        console.log(response);
      })
      .finally(() => {
        setAntLoading(false);
      });
  };
  useEffect(() => {
    let id = query("id");
    getData(id);
    console.log(id);
  }, []);
  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Row gutter={[32, 32]}>
            <BreadCrumbs
              breadCrumbParent="Pages"
              breadCrumbActive="Detail Data Karyawan"
            />
          </Row>
        </Col>

        <PageTitle pageTitle="Data Karyawan" />
        <Card style={{ marginTop: 20, width: "100%", padding: 10 }}>
          {antLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spin />
            </div>
          ) : (
            <>
              <Row justify="center">
                <Col span={12}>
                  <Image
                    style={{ width: "100%", borderRadius: 10 }}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </Col>
              </Row>
              <Divider orientation="left">Default Size</Divider>
              <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                  </List.Item>
                )}
              />
            </>
          )}
        </Card>
      </Row>
    </>
  );
};

export default Detail;
