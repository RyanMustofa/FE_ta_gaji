import React, { useState } from 'react'
import { Link, useHistory,Redirect } from 'react-router-dom'
import { Row, Col, Form, Input, Button } from 'antd'
import httpRequest from '@/utils/axios'

import LeftContent from './leftContent'

const endpoint = 'api/login'

export default function Login() {
  const [form] = Form.useForm()
  const { push } = useHistory()
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    form.validateFields().then(async (res) => {
      setLoading(true)
      await httpRequest({
        method: 'post',
        url: endpoint,
        data: res,
      })
        .then((response) => {
          window.localStorage.setItem('token', response?.data?.data?.token)
          push('/')
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }
  if(window?.localStorage.getItem('token')){
    return <Redirect to="/" />
  }
  return (
    <Row gutter={[32, 0]} className="hp-authentication-page">
      <LeftContent />

      <Col lg={12} span={24} className="hp-py-sm-0 hp-py-md-64">
        <Row className="hp-h-100" align="middle" justify="center">
          <Col
            xxl={11}
            xl={15}
            lg={20}
            md={20}
            sm={24}
            className="hp-px-sm-8 hp-pt-24 hp-pb-48"
          >
            <h1 className="hp-mb-sm-0">Login</h1>
            <p className="hp-mt-sm-0 hp-mt-8 hp-text-color-black-60">
              Welcome back, please login to your account.
            </p>

            <Form
              layout="vertical"
              form={form}
              name="basic"
              initialValues={{ remember: true }}
              className="hp-mt-sm-16 hp-mt-32"
            >
              <Form.Item
                label="Username :"
                name="username"
                className="hp-mb-16"
                rules={[
                  {
                    required: true,
                    // type: 'Username',
                  },
                ]}
              >
                <Input placeholder="Input Username" />
              </Form.Item>

              <Form.Item
                label="Password :"
                className="hp-mb-8"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password placeholder="Input Password" />
              </Form.Item>

              {/* <Row align="middle" justify="space-between">
                <div></div>

                <Link
                  className="hp-button hp-text-color-black-80 hp-text-color-dark-40"
                  to="/pages/authentication/recover-password"
                >
                  Forgot Password?
                </Link>
              </Row> */}

              <Form.Item className="hp-mt-16 hp-mb-8">
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>

            {/* <Col className="hp-form-info">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4">
                Don’t you have an account?
              </span>

              <Link
                className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
                to="/register"
              >
                Create an account
              </Link>
            </Col> */}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
