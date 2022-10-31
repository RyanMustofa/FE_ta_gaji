import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd'
import React from 'react'

export default function ModalEmployee({
  form,
  onCancel,
  onOk,
  loading,
  record,
  visible,
}) {
  return (
    <>
      <Modal
        title={`${record ? 'Edit' : 'Tambah'} Data Karyawan`}
        visible={visible}
        style={{
          marginTop: '-70px',
        }}
        confirmLoading={loading}
        onCancel={onCancel}
        onOk={onOk}
      >
        <div
          style={{
            height: 'calc(100vh - 300px)',
            overflowY: 'scroll',
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Form.Item
                  name="id"
                  label="ID Karyawan"
                  rules={[
                    {
                      required: true,
                      message: 'ID Karyawan tidak boleh kosong',
                    },
                  ]}
                >
                  <Input placeholder="ID Karyawan" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Nama"
                  rules={[
                    {
                      required: true,
                      message: 'Nama tidak boleh kosong',
                    },
                  ]}
                >
                  <Input placeholder="Nama" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="position"
                  label="Jabatan"
                  rules={[
                    {
                      required: true,
                      message: 'Jabatan tidak boleh kosong',
                    },
                  ]}
                >
                  <Select placeholder="Jabatan">
                    <Select.Option key={1} value={1}>
                      Developer
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="account_number"
                  label="No. Rek"
                  rules={[
                    {
                      validator: (rule, value, cb) => {
                        let values = value || null
                        if (!values) {
                          cb('No. Rek tidak boleh kosong')
                        }
                        if (!Number(values)) {
                          return cb('No. Rek harus angka')
                        }
                        return cb()
                      },
                    },
                  ]}
                >
                  <Input placeholder="No. Rek" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Jenis Kelamin"
                  rules={[
                    {
                      required: true,
                      message: 'Jenis tidak boleh kosong',
                    },
                  ]}
                >
                  <Input placeholder="Jenis Kelamin" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="handphone"
                  label="No. HP"
                  rules={[
                    {
                      validator: (rule, value, cb) => {
                        let values = value || null
                        if (!values) {
                          return cb('No. HP tidak boleh kosong')
                        }
                        if (!Number(values)) {
                          return cb('No. HP harus angka')
                        }
                        return cb()
                      },
                    },
                  ]}
                >
                  <Input placeholder="No. HP" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="join_date"
                  label="Tgl Masuk Kerja"
                  rules={[
                    {
                      required: true,
                      message: 'Tgl Masuk Kerja tidak boleh kosong',
                    },
                  ]}
                >
                  <DatePicker format={'DD-MM-YYYY'} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="birthdate"
                  label="Tanggal Lahir"
                  rules={[
                    {
                      required: true,
                      message: 'Tanggal Lahir tidak boleh kosong',
                    },
                  ]}
                >
                  <DatePicker format={'DD-MM-YYYY'} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="address" label="Alamat">
                  <Input.TextArea rows={3} placeholder="Alamat" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  )
}
