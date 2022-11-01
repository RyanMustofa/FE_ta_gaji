import React, { useState } from 'react'
import Breadcrumbs from '@/layout/components/content/breadcrumbs'
import PageTitle from '@/layout/components/content/page-title'
import { Button, Col, Form, Input, Row, Table } from 'antd'
import { Delete, Edit } from 'react-iconly'
import ModalEmployee from './modal'
import ModalDelete from '@/view/components/delete-modal'

export default function Attendance() {
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [form] = Form.useForm()

  const onOk = () => {
    form.validateFields().then((res) => {
      setLoading(false)
      console.log(res)
      setVisible(false)
      setRecord(null)
      form.resetFields()
    })
  }

  const onCancel = () => {
    setVisible(false)
    setRecord(null)
    form.resetFields()
  }

  const handleDelete = () => {
    setLoadingDelete(false)
    console.log(record)
  }

  const fieldColumns = [
    {
      title: 'No',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'ID Absensi',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'ID Karyawan',
      dataIndex: 'id_employee',
      key: 'id_employee',
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Jabatan',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Jam Masuk',
      dataIndex: 'in',
      key: 'in',
    },
    {
      title: 'Jam Keluar',
      dataIndex: 'out',
      key: 'out',
    },
    {
      title: 'Status Kehadiran',
      dataIndex: 'remarks',
      key: 'remarks',
    },
  ]
  const columns = [
    ...fieldColumns,
    {
      title: '#',
      render: (_, record, index) => {
        return (
          <>
            <Edit
              set="outlined"
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                setVisible(true)
                setRecord(record)
              }}
            />
            <Delete
              set="outlined"
              style={{ marginLeft: 5, cursor: 'pointer' }}
              onClick={() => {
                setRecord(record)
                setVisibleDelete(true)
              }}
              primaryColor="#f50"
            />
          </>
        )
      },
    },
  ]
  return (
    <>
      <ModalEmployee
        visible={visible}
        record={record}
        form={form}
        loading={loading}
        onCancel={onCancel}
        onOk={onOk}
      />
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
              breadCrumbActive="Absensi Karyawan"
            />
          </Row>
        </Col>

        <PageTitle pageTitle="Absensi Karyawan" />
        <div style={{ marginTop: 20, width: '100%', padding: 10 }}>
          <Row justify="space-between" style={{ marginBottom: 20 }}>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  setVisible(true)
                  setRecord(null)
                }}
              >
                Tambah Absensi
              </Button>
            </Col>
            <Col>
              <Input placeholder="Search" />
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={[
              {
                name: 'tes',
                position: 'tes',
              },
            ]}
            scroll={{
              x: 1000,
            }}
          />
        </div>
      </Row>
    </>
  )
}
