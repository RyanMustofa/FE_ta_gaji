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

export default function ModalAttendance({
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
        title={`${record ? 'Edit' : 'Tambah'} Data Absensi`}
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
                  name="jam_masuk"
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
                  name="jam_pulang"
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
              <Col span={12}>
                <Form.Item
                  name="karyawan_id"
                  label="ID Karyawan"
                  rules={[
                    {
                      required: true,
                      message: 'ID Karyawan tidak boleh kosong',
                    },
                  ]}
                >
                  <Select placeholder="Pilih Karyawan" allowClear>
                    {state.dataEmployee.map((el) => {
                      return (
                        <Select.Option value={el.id} key={el.id}>
                          {el.nama}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tgl_absen"
                  label="Tanggal Absensi"
                  rules={[
                    {
                      required: true,
                      message: 'Tanggal Absensi tidak boleh kosong',
                    },
                  ]}
                >
                  <DatePicker
                    getPopupContainer={(parent) => parent.parentNode}
                    style={{ width: '100%' }}
                    format="DD-MM-YYYY"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="status_kehadiran"
                  rules={[
                    {
                      required: true,
                      message: 'Status kehadiran tidak boleh kosong',
                    },
                  ]}
                  label="Status Kehadiran"
                >
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
