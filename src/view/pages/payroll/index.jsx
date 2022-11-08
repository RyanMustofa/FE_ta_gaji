import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@/layout/components/content/breadcrumbs'
import PageTitle from '@/layout/components/content/page-title'
import { Button, Card, Col, DatePicker, Form, Input, Row, Table } from 'antd'
import { Delete, Edit } from 'react-iconly'
import ModalDelete from '@/view/components/delete-modal'
import httpRequest from '@/utils/axios'
import moment from 'moment'

const endpoint = 'api/run-payroll'
const endpointList = 'api/kelola-gaji'
const endpointKaryawan = 'api/karyawan'

export default function Payroll() {
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [antLoading, setAntLoading] = useState(false)
  const [dataEmployee, setDataEmployee] = useState([])
  const [form] = Form.useForm()
  const [meta, setMeta] = useState({
    dir: 'desc',
    offset: 0,
    order: 'created_at',
    page: 1,
    perPage: 5,
    search: '',
    total: 1,
    totalPage: 1,
  })
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])
  const [loadingAdd, setLoadingAdd] = useState(false)

  const state = {
    dataEmployee,
  }

  const getData = async () => {
    setAntLoading(true)
    await httpRequest({
      url: endpointList,
      method: 'get',
      params: meta,
    })
      .then((response) => {
        setTotal(response?.data?.meta?.total)
        setData(response?.data?.results)
      })
      .finally(() => {
        setAntLoading(false)
      })
  }

  const getEmployee = async () => {
    // setLoadingAdd(true)
    await httpRequest({
      url: endpointKaryawan,
      method: 'get',
      params: {
        ...meta,
        perPage: 100000,
      },
    })
      .then((response) => {
        setDataEmployee(response?.data?.results)
        // setVisible(true)
      })
      .finally(() => {
        // setLoadingAdd(false)
      })
  }

  useEffect(() => {
    getEmployee()
    getData()
  }, [meta])

  const onOk = () => {
    form.validateFields().then(async (res) => {
      setLoading(true)
      await httpRequest({
        url: endpoint,
        method: record ? 'put' : 'post',
        data: {
          ...res,
          tgl_lahir: moment(res.tgl_lahir).format('YYYY-MM-DD'),
        },
        params: {
          id: record ? record.id : undefined,
        },
      })
        .then((response) => {
          setVisible(false)
          form.resetFields()
          setRecord(null)
          getData()
        })
        .catch((error) => {
          form.resetFields()
        })
        .finally(() => {
          setLoading(false)
          setLoadingAdd(false)
        })
    })
  }

  const onCancel = () => {
    setVisible(false)
    setRecord(null)
    setLoadingAdd(false)
    form.resetFields()
  }

  const handleDelete = async () => {
    setLoadingDelete(true)
    await httpRequest({
      url: endpoint,
      method: 'delete',
      params: {
        id: record?.id,
      },
    })
      .then((res) => {
        getData()
        setVisibleDelete(false)
      })
      .finally(() => {
        setLoadingDelete(false)
      })
  }

  const runPayroll = () => {
    form.validateFields().then(async (result) => {
      delete result.button
      let tgl_penggajian = moment(result.tgl_penggajian).format('YYYY-MM-DD')
      result.tgl_penggajian = tgl_penggajian

      setLoading(true)
      setShowTable(false)

      await httpRequest({
        method: 'post',
        url: endpoint,
        data: result,
      })
        .then((res) => {
          setShowTable(true)
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }

  const fieldColumns = [
    {
      title: 'No',
      render: (_, record, index) =>
        meta?.page > 1 ? index + 1 + meta?.perPage : index + 1,
    },
    {
      title: 'Karyawan',
      dataIndex: ['karyawan', 'nama'],
      key: 'name',
    },
    {
      title: 'Tanggal Penggajian',
      dataIndex: 'tgl_penggajian',
      key: 'tgl_penggajian',
    },
    {
      title: 'Total Tunjangan',
      dataIndex: 'total_tunjangan',
      key: 'total_tunjangan',
    },
    {
      title: 'Total Pengurangan',
      dataIndex: 'total_pengurangan',
      key: 'total_pengurangan',
    },
    {
      title: 'Total Gaji',
      dataIndex: 'total_gaji',
      key: 'total_gaji',
    },
  ]
  const columns = [
    ...fieldColumns,
    // {
    //   title: '#',
    //   width: 100,
    //   render: (_, record, index) => {
    //     return (
    //       <>
    //         <Edit
    //           set="outlined"
    //           style={{
    //             cursor: 'pointer',
    //           }}
    //           onClick={() => {
    //             setVisible(true)
    //             setRecord(record)
    //             form.setFieldsValue({
    //               ...record,
    //               jam_masuk: moment('2022-10-21T' + record.jam_masuk),
    //               jam_pulang: moment('2022-10-21T' + record.jam_pulang),
    //               tgl_absen: moment(record.tgl_absen),
    //             })
    //           }}
    //         />
    //         <Delete
    //           set="outlined"
    //           style={{ marginLeft: 5, cursor: 'pointer' }}
    //           onClick={() => {
    //             setRecord(record)
    //             setVisibleDelete(true)
    //           }}
    //           primaryColor="#f50"
    //         />
    //       </>
    //     )
    //   },
    // },
  ]
  return (
    <>
      <ModalDelete
        visible={visibleDelete}
        loading={loadingDelete}
        onCancel={() => {
          setVisibleDelete(false)
          setRecord(null)
        }}
        onOk={handleDelete}
      />
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Row gutter={[32, 32]}>
            <Breadcrumbs
              breadCrumbParent="Pages"
              breadCrumbActive="Data Penggajian"
            />
          </Row>
        </Col>

        <PageTitle pageTitle="Data Penggajian" />
        <Card style={{ marginTop: 20, width: '100%', padding: 10 }}>
          <Form layout="vertical" form={form}>
            <Row justify="start" gutter={[20]}>
              <Col span={8}>
                <Form.Item
                  label="Tanggal"
                  name="tgl_penggajian"
                  rules={[
                    {
                      required: true,
                      message: 'Tanggal tidak boleh kosong',
                    },
                  ]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label=" " name="button">
                  <Button type="primary" loading={loading} onClick={runPayroll}>
                    Jalankan Penggajian
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {!showTable ? null : (
            <>
              <Row justify="space-between" style={{ marginBottom: 20 }}>
                <Col></Col>
                <Col>
                  <Input
                    onChange={(e) => {
                      setTimeout(() => {
                        setMeta({
                          ...meta,
                          search: e.target.value,
                        })
                      }, 500)
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
                  })
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
            </>
          )}
        </Card>
      </Row>
    </>
  )
}
