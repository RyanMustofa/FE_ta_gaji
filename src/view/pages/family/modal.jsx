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
} from "antd";
import React from "react";

export default function ModalFamily({
  form,
  onCancel,
  onOk,
  loading,
  record,
  visible,
  state,
}) {
  const dataJenis = [
    {
      id: 1,
      nama: "Anak",
      display: "Anak",
    },
    {
      id: 2,
      nama: "Istri",
      display: "Istri",
    },
  ];
  return (
    <>
      <Modal
        title={`${record ? "Edit" : "Tambah"} Data Keluarga`}
        visible={visible}
        style={{
          marginTop: "-70px",
        }}
        confirmLoading={loading}
        onCancel={onCancel}
        onOk={onOk}
      >
        <div
          style={{
            height: "calc(100vh - 300px)",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Form.Item
                  name="karyawan_id"
                  label="Nama Karyawan"
                  rules={[
                    {
                      required: true,
                      message: "Nama Karyawan tidak boleh kosong",
                    },
                  ]}
                >
                  <Select placeholder="Pilih Karyawan" allowClear>
                    {state.dataEmployee.map((el) => {
                      return (
                        <Select.Option value={el.id} key={el.id}>
                          {el.nama}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nama"
                  label="Nama Keluarga"
                  rules={[
                    {
                      required: true,
                      message: "Nama Keluarga tidak boleh kosong",
                    },
                  ]}
                >
                  <Input placeholder="Nama Keluarga" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="jenis"
                  label="Jenis"
                  rules={[
                    {
                      required: true,
                      message: "Jenis tidak boleh kosong",
                    },
                  ]}
                >
                  <Select placeholder="Jenis">
                    {dataJenis.map((el) => {
                      return (
                        <Select.Option key={el.id} value={el.nama}>
                          {el.display}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tgl_lahir"
                  rules={[
                    {
                      required: true,
                      message: "Tanggal Lahir tidak boleh kosong",
                    },
                  ]}
                  label="Tanggal Lahir"
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
