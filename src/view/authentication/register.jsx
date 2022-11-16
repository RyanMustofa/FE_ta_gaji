import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Row, Col, Form, Input, Button, Radio } from 'antd'

import LeftContent from './leftContent'

export default function SignUp() {
  const { push } = useHistory()
  const [form] = Form.useForm()
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    form.validateFields().then((res) => {
      push('/')
    })
  }
  if(window?.localStorage.getItem('token')){
    return <Redirect to="/" />
  }
  return (
    <Row gutter={[32, 0]} className="hp-authentication-page">
      <LeftContent />

      <Col md={12}>
        <Row className="hp-h-100" align="middle" justify="center">
          <Col
            xxl={11}
            xl={15}
            lg={20}
            md={20}
            sm={24}
            className="hp-px-sm-8 hp-pt-24 hp-pb-48"
          >
            <h1>Create Account</h1>
            <p className="hp-mt-8 hp-text-color-black-60">
              Please sign up to your personal account if you want to use all our
              premium products.
            </p>

            <Form
              layout="vertical"
              name="basic"
              form={form}
              className="hp-mt-sm-16 hp-mt-32"
            >
              <Form.Item
                label="ID Admin :"
                name="id_admin"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="ID Admin" />
              </Form.Item>
              <Form.Item
                label="Username :"
                name="username"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                label="E-mail :"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                label="Password :"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password :"
                name="confirm_password"
                required={true}
                rules={[
                  {
                    validator: (rule, value, cb) => {
                      let values = value || null
                      if (!values) {
                        cb('Please enter Confirm Password')
                      }
                      if (value !== password) {
                        cb('Password does not match')
                      }
                      cb()
                    },
                  },
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item
                label="Jenis Kelamin :"
                name="gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="male">Laki-laki</Radio>
                  <Radio value="female">Perempuan</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item className="hp-mt-16 hp-mb-8">
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                >
                  Sign up
                </Button>
              </Form.Item>
            </Form>

            <div className="hp-form-info">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4">
                Already have an account?
              </span>

              <Link
                to="/login"
                className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
              >
                Login
              </Link>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
