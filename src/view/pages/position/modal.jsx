import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  TimePicker,
} from 'antd'
import React from 'react'

export default function ModalPosition({
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
        title={`${record ? 'Edit' : 'Tambah'} Data Jabatan`}
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
            overflowX: 'hidden',
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Form.Item
                  name="id"
                  label="ID Gaji"
                  rules={[
                    {
                      required: true,
                      message: 'ID Gaji tidak boleh kosong',
                    },
                  ]}
                >
                  <Input placeholder="ID Gaji" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Nama Jabatan"
                  rules={[
                    {
                      required: true,
                      message: 'Nama Jabatan tidak boleh kosong',
                    },
                  ]}
                >
                  <Input placeholder="Nama Jabatan" />
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
                  name="in"
                  label="Jam Masuk"
                  rules={[
                    {
                      required: true,
                      message: 'Jam Masuk tidak boleh kosong',
                    },
                  ]}
                >
                  <TimePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="in"
                  label="Jam Keluar"
                  rules={[
                    {
                      required: true,
                      message: 'Jam Keluar tidak boleh kosong',
                    },
                  ]}
                >
                  <TimePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="remarks" label="Status Kehadiran">
                  <Input.TextArea rows={3} placeholder="Status Kehadiran" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  )
}
