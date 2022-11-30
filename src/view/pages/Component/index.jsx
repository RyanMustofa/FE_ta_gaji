import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/layout/components/content/breadcrumbs";
import PageTitle from "@/layout/components/content/page-title";
import { Button, Card, Col, Form, Input, Row, Table } from "antd";
import { Delete, Edit } from "react-iconly";
import ModalComponent from "./modal";
import ModalDelete from "@/view/components/delete-modal";
import httpRequest from "@/utils/axios";
import moment from "moment";
import { useHistory } from "react-router-dom";

const endpoint = "api/komponen";

export default function ComponentPayroll() {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [antLoading, setAntLoading] = useState(false);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [form] = Form.useForm();
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
  const [loadingAdd, setLoadingAdd] = useState(false);

  const state = {
    dataEmployee,
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
        setData(response?.data?.results);
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
        url: endpoint,
        method: record ? "put" : "post",
        data: {
          ...res,
          tgl_lahir: moment(res.tgl_lahir).format("YYYY-MM-DD"),
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
          const { push } = useHistory();
          push("pages/component-payroll");
        })
        .catch((error) => {
          form.resetFields();
        })
        .finally(() => {
          setLoading(false);
          setLoadingAdd(false);
        });
    });
  };

  const onCancel = () => {
    setVisible(false);
    setRecord(null);
    setLoadingAdd(false);
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
      key: "in",
    },
    {
      title: "Tipe",
      dataIndex: "tipe",
      key: "tipe",
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
                setRecord(record);
                form.setFieldsValue({
                  ...record,
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
  return (
    <>
      <ModalComponent
        visible={visible}
        record={record}
        form={form}
        loading={loading}
        onCancel={onCancel}
        state={state}
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
              breadCrumbActive="Komponent Payroll"
            />
          </Row>
        </Col>

        <PageTitle pageTitle="Komponent Payroll" />
        <Card style={{ marginTop: 20, width: "100%", padding: 10 }}>
          <Row justify="space-between" style={{ marginBottom: 20 }}>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  setVisible(true);
                  setRecord(null);
                }}
              >
                Tambah Komponen
              </Button>
            </Col>
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
            pagination={{
              current: meta.page,
              total,
              pageSize: meta.perPage,
            }}
            loading={antLoading}
            scroll={{
              x: 1000,
            }}
          />
        </Card>
      </Row>
    </>
  );
}
