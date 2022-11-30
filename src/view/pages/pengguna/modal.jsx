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
import { Delete, Upload as IconUpload } from "react-iconly";
import React from "react";

export default function ModalEmployee({
  form,
  onCancel,
  onOk,
  loading,
  state,
  record,
  visible,
}) {
  return (
    <>
      <Modal
        title={`${record ? "Edit" : "Tambah"} Data Pengguna`}
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
              <Col span={12}>
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
              <Col span={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "Username tidak boleh kosong",
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Email tidak boleh kosong",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: "Role tidak boleh kosong",
                    },
                  ]}
                >
                  <Select placeholder="Select Role">
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="staff">Staff</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={
                    record
                      ? []
                      : [
                          {
                            required: true,
                            message: "Password tidak boleh kosong",
                          },
                        ]
                  }
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
