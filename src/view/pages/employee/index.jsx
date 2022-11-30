import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/layout/components/content/breadcrumbs";
import PageTitle from "@/layout/components/content/page-title";
import { Button, Card, Col, Form, Input, Row, Table } from "antd";
import { Delete, Edit, Show } from "react-iconly";
import ModalEmployee from "./modal";
import ModalDelete from "@/view/components/delete-modal";
import httpRequest from "@/utils/axios";
import moment from "moment";
import { useHistory } from "react-router-dom";

const endpoint = "api/karyawan";
const endpointJabatan = "api/jabatan";

export default function Employee() {
  const { push } = useHistory();
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [antLoading, setAntLoading] = useState(false);
  const [form] = Form.useForm();
  const [baseUrl, setBaseUrl] = useState({
    status: false,
    url: "",
    fileList: [],
  });
  const [meta, setMeta] = useState({
    dir: "desc",
    offset: 0,
    order: "created_at",
    page: 1,
    perPage: 10,
    search: "",
    total: 1,
    totalPage: 1,
  });
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [dataJabatan, setDataJabatan] = useState([]);

  const state = {
    dataJabatan,
    baseUrl,
    setBaseUrl,
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

  const getPosition = async () => {
    await httpRequest({
      url: endpointJabatan,
      method: "get",
    }).then((response) => {
      setDataJabatan(response?.data?.results);
    });
  };

  useEffect(() => {
    getData();
    getPosition();
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
          tgl_masuk_kerja: moment(res.tgl_masuk_kerja).format("YYYY-MM-DD"),
          foto: baseUrl.url,
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
          setBaseUrl({
            status: false,
            url: "",
            fileList: [],
          });
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
    setBaseUrl({
      status: false,
      url: "",
      fileList: [],
    });
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
    // {
    //   title: 'ID Karyawan',
    //   dataIndex: 'id_karyawan',
    //   key: 'id_karyawan',
    // },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Jabatan",
      dataIndex: ["jabatan", "nama"],
      key: "position",
    },
    {
      title: "Jenis Kelamin",
      dataIndex: "jenis_kelamin",
      key: "jenis_kelamin",
    },
    {
      title: "No. HP",
      dataIndex: "no_hp",
      key: "no_hp",
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "tgl_lahir",
      key: "tgl_lahir",
    },
    {
      title: "Tanggal Masuk Kerja",
      dataIndex: "tgl_masuk_kerja",
      key: "tgl_masuk_kerja",
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
    },
  ];
  const columns = [
    ...fieldColumns,
    {
      title: "#",
      width: 100,
      render: (_, record, index) => {
        return (
          <div style={{ display: "flex" }}>
            <Show
              set="outlined"
              style={{ marginLeft: 5, cursor: "pointer" }}
              onClick={() => {
                push(`/pages/employee-detail?id=${record.id}`);
              }}
            />
            <Edit
              set="outlined"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setVisible(true);
                setRecord(record);
                if (record?.foto) {
                  setBaseUrl({
                    status: true,
                    url: record.foto,
                    fileList: [
                      {
                        id: 1,
                      },
                    ],
                  });
                }
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
          </div>
        );
      },
    },
  ];
  return (
    <>
      <ModalEmployee
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
              breadCrumbActive="Data Karyawan"
            />
          </Row>
        </Col>

        <PageTitle pageTitle="Data Karyawan" />
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
                Tambah Karyawan
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
              x: 1300,
            }}
          />
        </Card>
      </Row>
    </>
  );
}
