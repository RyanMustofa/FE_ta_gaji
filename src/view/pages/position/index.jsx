import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/layout/components/content/breadcrumbs";
import PageTitle from "@/layout/components/content/page-title";
import { Button, Card, Col, Form, Input, Row, Table } from "antd";
import { Delete, Edit } from "react-iconly";
import ModalPosition from "./modal";
import ModalDelete from "@/view/components/delete-modal";
import httpRequest from "@/utils/axios";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";

const endpoint = "api/jabatan";
const endpointKomponen = "api/komponen";

export default function Position() {
  const { push } = useHistory();
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [antLoading, setAntLoading] = useState(false);
  const [form] = Form.useForm();
  const [type, setType] = useState("jabatan");
  const [meta, setMeta] = useState({
    dir: "desc",
    offset: 0,
    order: "created_at",
    page: 1,
    perPage: 5,
    search: "",
    total: 1,
    totalPage: 1,
  });
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  const state = {
    type,
  };

  const getData = async () => {
    setAntLoading(true);
    await httpRequest({
      url: endpoint,
      method: "get",
      params: meta,
    })
      .then((response) => {
        setTotal(response?.data?.meta?.total);
        let data = response?.data?.results.map((el) => {
          return {
            ...el,
            key: el.id,
          };
        });
        setData(data);
      })
      .finally(() => {
        setAntLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [meta]);

  const onOk = () => {
    form.validateFields().then(async (res) => {
      setLoading(true);
      await httpRequest({
        url: type === "jabatan" ? endpoint : endpointKomponen,
        method: record ? "put" : "post",
        data: {
          ...res,
        },
        params: {
          id: record ? record.id : undefined,
        },
      })
        .then((response) => {
          setVisible(false);
          form.resetFields();
          setRecord(null);
          getData();
        })
        .catch((error) => {
          form.resetFields();
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const onCancel = () => {
    setVisible(false);
    setRecord(null);
    form.resetFields();
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    await httpRequest({
      url: endpoint,
      method: "delete",
      params: {
        id: record?.id,
      },
    })
      .then((res) => {
        getData();
        setVisibleDelete(false);
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  const fieldColumns = [
    {
      title: "No",
      render: (_, record, index) =>
        meta?.page > 1 ? index + 1 + meta?.perPage : index + 1,
    },

    {
      title: "Nama",
      dataIndex: "nama",
      key: "name",
    },
    {
      title: "Nama",
      dataIndex: "tipe",
      key: "name",
    },
  ];
  const columns = [
    ...fieldColumns,
    {
      title: "#",
      width: 100,
      render: (_, record, index) => {
        return (
          <>
            <Edit
              set="outlined"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setVisible(true);
                setType("jabatan");
                setRecord(record);
                form.setFieldsValue({
                  ...record,
                  tgl_lahir: moment(record.tgl_lahir),
                  tgl_masuk_kerja: moment(record.tgl_masuk),
                });
              }}
            />
            <Delete
              set="outlined"
              style={{ marginLeft: 5, cursor: "pointer" }}
              onClick={() => {
                setRecord(record);
                setVisibleDelete(true);
              }}
              primaryColor="#f50"
            />
          </>
        );
      },
    },
  ];

  const fieldColumnsExpanded = [
    {
      title: "Nama",
      dataIndex: ["komponen", "nama"],
      key: "nama",
    },
    {
      title: "Tipe",
      dataIndex: ["komponen", "tipe"],
      key: "tipe",
    },
    {
      title: "Jumlah",
      dataIndex: "jumlah",
      key: "jumlah",
    },
  ];

  const expandedRowRender = (record) => {
    return (
      <Table
        columns={fieldColumnsExpanded}
        pagination={false}
        dataSource={record.tunjangans.concat(record.potongans)}
      />
    );
  };

  const expandable = {
    expandedRowRender,
  };

  return (
    <>
      <ModalPosition
        visible={visible}
        record={record}
        form={form}
        loading={loading}
        state={state}
        onCancel={onCancel}
        onOk={onOk}
      />
      <ModalDelete
        visible={visibleDelete}
        loading={loadingDelete}
        onCancel={() => {
          setVisibleDelete(false);
          setRecord(null);
        }}
        onOk={handleDelete}
      />
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Row gutter={[32, 32]}>
            <Breadcrumbs
              breadCrumbParent="Pages"
              breadCrumbActive="Data Jabatan"
            />
          </Row>
        </Col>

        <PageTitle pageTitle="Data Jabatan" />
        <Card style={{ marginTop: 20, width: "100%", padding: 10 }}>
          <Row justify="space-between" style={{ marginBottom: 20 }}>
            <Row>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    setVisible(true);
                    setRecord(null);
                    setType("jabatan");
                  }}
                >
                  Tambah Jabatan
                </Button>
              </Col>
              <Col
                style={{
                  marginLeft: 10,
                }}
              >
                {/* <Button
                  type="primary"
                  onClick={() => {
                    setVisible(true)
                    setRecord(null)
                    setType('component')
                  }}
                >
                  Kelola Komponen
                </Button> */}
              </Col>
              <Col
                style={{
                  marginLeft: 10,
                }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    push("/pages/component-payroll");
                  }}
                >
                  List Komponen
                </Button>
              </Col>
              <Col
                style={{
                  marginLeft: 10,
                }}
              >
                <Link to="/pages/set-component">
                  <Button type="primary">Kelola Gaji</Button>
                </Link>
              </Col>
            </Row>
            <Col>
              <Input
                onChange={(e) => {
                  setTimeout(() => {
                    setMeta({
                      ...meta,
                      search: e.target.value,
                    });
                  }, 500);
                }}
                allowClear
                placeholder="Search"
              />
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            onChange={(pagination, filters, sorter) => {
              setMeta({
                ...meta,
                page: pagination.current,
                perPage: pagination.pageSize,
              });
            }}
            expandable={expandable}
            pagination={{
              current: meta.page,
              total,
              pageSize: meta.perPage,
            }}
            loading={antLoading}
          />
        </Card>
      </Row>
    </>
  );
}
