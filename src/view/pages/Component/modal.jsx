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

export default function ModalComponent({
  form,
  onCancel,
  onOk,
  loading,
  record,
  visible,
  state,
}) {
  return (
    <>
      <Modal
        title={`${record ? 'Edit' : 'Tambah'} Data Keluarga`}
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
                  name="nama"
                  label="Nama Komponen"
                  rules={[
                    {
                      required: true,
                      message: 'Nama Komponen tidak boleh kosong',
                    },
                  ]}
                >
                  <Input placeholder="Nama Komponen" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tipe"
                  rules={[
                    {
                      required: true,
                      message: 'Tipe tidak boleh kosong',
                    },
                  ]}
                  label="Tipe"
                >
                  <Select placeholder="Pilih Tipe">
                    <Select.Option value="Penambahan">Penambahan</Select.Option>
                    <Select.Option value="Pengurangan">
                      Pengurangan
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  )
}
