import {
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Upload,
} from "antd";
import React from "react";
import { Delete, Upload as IconUpload } from "react-iconly";

export default function ModalEmployee({
  form,
  onCancel,
  onOk,
  loading,
  record,
  state,
  visible,
}) {
  return (
    <>
      <Modal
        title={`${record ? "Edit" : "Tambah"} Data Karyawan`}
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
              {/* <Col span={12}>
                <Form.Item
                  name="id_karyawan"
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
              </Col> */}
              <Col span={24}>
                <Form.Item
                  name="nama"
                  label="Nama"
                  rules={[
                    {
                      required: true,
                      message: "Nama tidak boleh kosong",
                    },
                  ]}
                >
                  <Input placeholder="Nama" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="no_sk"
                  label="No SK"
                  rules={[
                    {
                      required: true,
                      message: "NO SK boleh kosong",
                    },
                  ]}
                >
                  <Input placeholder="NO SK" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="no_rek"
                  label="No Rekening"
                  rules={[
                    {
                      required: true,
                      message: "No Rekening boleh kosong",
                    },
                  ]}
                >
                  <Input placeholder="No Rekening" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nama_bank"
                  label="Nama Bank"
                  rules={[
                    {
                      required: true,
                      message: "Nama Bank boleh kosong",
                    },
                  ]}
                >
                  <Input placeholder="Nama Bank" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="jabatan_id"
                  label="Jabatan"
                  rules={[
                    {
                      required: true,
                      message: "Jabatan tidak boleh kosong",
                    },
                  ]}
                >
                  <Select placeholder="Jabatan">
                    {state.dataJabatan.map((el) => {
                      return (
                        <Select.Option key={el.id} value={el.id}>
                          {el.nama}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="jenis_kelamin"
                  label="Jenis Kelamin"
                  rules={[
                    {
                      required: true,
                      message: "Jenis tidak boleh kosong",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="laki-laki">Laki-laki</Radio>
                    <Radio value="perempuan">Perempuan</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="no_hp"
                  label="No. HP"
                  required={true}
                  rules={[
                    {
                      validator: (rule, value, cb) => {
                        let values = value || null;
                        if (!values) {
                          return cb("No. HP tidak boleh kosong");
                        }
                        if (!Number(values)) {
                          return cb("No. HP harus angka");
                        }
                        return cb();
                      },
                    },
                  ]}
                >
                  <Input placeholder="No. HP" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tgl_masuk_kerja"
                  label="Tgl Masuk Kerja"
                  rules={[
                    {
                      required: true,
                      message: "Tgl Masuk Kerja tidak boleh kosong",
                    },
                  ]}
                >
                  <DatePicker format={"DD-MM-YYYY"} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tgl_lahir"
                  label="Tanggal Lahir"
                  rules={[
                    {
                      required: true,
                      message: "Tanggal Lahir tidak boleh kosong",
                    },
                  ]}
                >
                  <DatePicker format={"DD-MM-YYYY"} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item
                  name="jumlah_istri"
                  label="Jumlah Istri"
                  required={true}
                  rules={[
                    {
                      validator: (rule, value, cb) => {
                        let values = value || null
                        if (!values) {
                          return cb('Jumlah Istri tidak boleh kosong')
                        }
                        if (!Number(values)) {
                          return cb('Jumlah Istri harus angka')
                        }
                        return cb()
                      },
                    },
                  ]}
                >
                  <Input placeholder="Jumlah Istri" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="jumlah_anak"
                  label="Jumlah Anak"
                  required={true}
                  rules={[
                    {
                      validator: (rule, value, cb) => {
                        let values = value || null
                        if (!values) {
                          return cb('Jumlah Anak tidak boleh kosong')
                        }
                        if (!Number(values)) {
                          return cb('Jumlah Anak harus angka')
                        }
                        return cb()
                      },
                    },
                  ]}
                >
                  <Input placeholder="Jumlah Anak" />
                </Form.Item>
              </Col> */}
              <Col span={24}>
                <Form.Item
                  name="alamat"
                  label="Alamat"
                  rules={[
                    {
                      required: true,
                      message: "Alamat tidak boleh kosong",
                    },
                  ]}
                >
                  <Input.TextArea rows={3} placeholder="Alamat" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Upload.Dragger
                    fileList={state.fileList}
                    showUploadList={false}
                    onChange={(info) => {
                      let fileReader = new FileReader();
                      fileReader.readAsDataURL(info.file.originFileObj);
                      fileReader.onloadend = () => {
                        state.setBaseUrl({
                          FileList: info.fileList,
                          status: true,
                          url: fileReader.result,
                        });
                      };
                    }}
                  >
                    {state.baseUrl.status ? (
                      <>
                        <Image src={state.baseUrl.url} />
                      </>
                    ) : (
                      <>
                        <p className="ant-upload-drag-icon">
                          <IconUpload style={{ width: 50 }} set="curved" />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          Support for a single or bulk upload. Strictly prohibit
                          from uploading company data or other band files
                        </p>
                      </>
                    )}
                  </Upload.Dragger>
                  {state.baseUrl.status ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        cursor: "pointer",
                        right: 10,
                      }}
                      onClick={() => {
                        state.setBaseUrl({
                          FileList: [],
                          status: false,
                          url: "",
                        });
                      }}
                    >
                      <Delete set="curved" primaryColor="#f50" />
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
