import { Button, Col, Divider, Image, List, Row, Spin, Typography } from "antd";
import Card from "antd/lib/card/Card";
import React from "react";
import { useEffect } from "react";
import BreadCrumbs from "../../../layout/components/content/breadcrumbs";
import PageTitle from "../../../layout/components/content/page-title";
import query from "../../../utils/query";
import httpRequest from "@/utils/axios";
import { useState } from "react";
import moment from "moment/moment";

const endpoint = "api/karyawan/detail";

const Detail = () => {
  const [antLoading, setAntLoading] = useState(true);
  const [karyawan, setKaryawan] = useState([]);
  const getData = async (id) => {
    setAntLoading(true);
    await httpRequest({
      url: `${endpoint}`,
      method: "get",
      params: {
        id: id,
      },
    })
      .then((response) => {
        console.log(response?.data?.data);
        setKaryawan(response?.data?.data);
      })
      .finally(() => {
        setAntLoading(false);
      });
  };
  useEffect(() => {
    let id = query("id");
    getData(id);
  }, []);
  const data = [
    {
      ...karyawan,
    },
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
                    src={
                      karyawan.foto ||
                      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    }
                  />
                </Col>
              </Row>
              <Divider orientation="left">Detail Karyawan</Divider>
              <List
                bordered
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: 120 }}>
                        <p>Nama</p>
                        <p>NO HP</p>
                        <p>Tanggal Lahir</p>
                        <p>Jabatan</p>
                        {item?.keluargas?.map((el) => {
                          return (
                            <>
                              <p>Nama {el.jenis}</p>
                            </>
                          );
                        })}
                      </div>
                      <div>
                        <p>: {item.nama}</p>
                        <p>: {item.no_hp}</p>
                        <p>: {moment(item.tgl_lahir).format("DD MMMM yyyy")}</p>
                        <p>: {item?.jabatan?.nama}</p>
                        {item?.keluargas?.map((el) => {
                          return (
                            <>
                              <p>: Nama {el.nama}</p>
                            </>
                          );
                        })}
                      </div>
                    </div>
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
