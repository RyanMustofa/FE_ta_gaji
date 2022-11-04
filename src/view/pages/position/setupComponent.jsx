import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@/layout/components/content/breadcrumbs'
import httpRequest from '@/utils/axios'
import PageTitle from '@/layout/components/content/page-title'
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
} from 'antd'
import { Link, useHistory } from 'react-router-dom'

const endpointKomponen = 'api/komponen'
const endpointJabatan = 'api/jabatan'
const endpointGaji = 'api/kelola-gaji'

export default function SetupComponent() {
  const { push } = useHistory()
  const [form] = Form.useForm()
  const [showComponent, setShowComponent] = useState(false)
  const [antLoading, setAntLoading] = useState(false)
  const [changeValue, setChangeValue] = useState([])
  const [dataJabatan, setDataJabatan] = useState([])
  const [dataForm, setDataForm] = useState(null)
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [dataFilter, setDataFilter] = useState(null)
  const [loadingView, setLoadingView] = useState(false)

  const fieldColumns = [
    {
      title: 'Name',
      width: 300,
      dataIndex: 'nama',
      key: 'name',
    },
  ]

  const getDataKomponen = async (valueComponent) => {
    setAntLoading(true)
    await httpRequest({
      url: endpointKomponen,
      method: 'get',
    })
      .then((res) => {
        let arr = res?.data?.results.map((el) => {
          return { ...el, nominal: null }
        })
        let data = arr.map((el) => {
          if (valueComponent.find((els) => els.id === el.id)) {
            return {
              ...valueComponent.find((els) => els.id === el.id),
              id_table: valueComponent.find((els) => els.id === el.id).id_table,
            }
          } else {
            return { ...el, id_table: null }
          }
        })
        setChangeValue(data)
      })
      .finally(() => {
        setAntLoading(false)
      })
  }
  const getDataPosition = async () => {
    // setAntLoading(true)
    await httpRequest({
      url: endpointJabatan,
      method: 'get',
      params: {
        perPage: 1000000,
      },
    })
      .then((res) => {
        setDataJabatan(res?.data?.results)
      })
      .finally(() => {
        // setAntLoading(false)
      })
  }

  const getData = async (id) => {
    setLoadingView(true)
    await httpRequest({
      url: endpointJabatan,
      method: 'get',
      params: {
        filterID: id,
      },
    })
      .then(async (response) => {
        let valueComponent = response?.data?.results.map((el) => {
          let allowance = el.tunjangans.map((els) => {
            return {
              ...els.komponen,
              nominal: els.jumlah,
              id_table: el.id,
            }
          })
          let deduction = el.potongans.map((els) => {
            return {
              ...els.komponen,
              nominal: els.jumlah,
              id_table: el.id,
            }
          })
          return [...allowance, ...deduction]
        })
        await getDataKomponen(
          valueComponent.length > 0 ? valueComponent[0] : {},
        )
        setDataFilter(response?.data?.results)
      })
      .finally(() => {
        setLoadingView(false)
      })
  }

  useEffect(() => {
    // getDataKomponen()
    getDataPosition()
  }, [])

  const columns = [
    ...fieldColumns,
    {
      title: 'Nominal',
      dataIndex: 'nominal',
      key: 'nominal',
      render: (_, record, index) => {
        return (
          <>
            <Input
              style={{ width: '100%' }}
              status={Number(record.nominal) ? null : 'error'}
              value={record.nominal}
              placeholder="Nominal"
              onChange={(e) => {
                let indexData = changeValue.findIndex((i) => i.id === record.id)
                let arr = [...changeValue]
                arr[indexData].nominal = e.target.value
                setChangeValue(arr)
              }}
            />
          </>
        )
      },
    },
  ]

  const handleView = () => {
    form.validateFields().then((res) => {
      setShowComponent(true)
      getData(res.position)
      setDataForm({
        jabatan_id: res.position,
      })
    })
  }

  const handleSubmit = async () => {
    let payload = {
      ...dataForm,
      penambahan: changeValue
        .filter((el) => el.tipe === 'Penambahan')
        .map((el) => {
          return {
            id: el.id_table,
            komponen_id: el.id,
            jumlah: parseInt(el.nominal),
          }
        }),
      pengurangan: changeValue
        .filter((el) => el.tipe === 'Pengurangan')
        .map((el) => {
          return {
            id: el.id_table,
            komponen_id: el.id,
            jumlah: parseInt(el.nominal),
          }
        }),
    }

    setLoadingAdd(true)
    await httpRequest({
      url: endpointGaji,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    })
      .then((response) => {
        push('/pages/position')
      })
      .finally(() => {
        setLoadingAdd(false)
      })
  }

  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Row gutter={[32, 32]}>
            <Breadcrumbs
              breadCrumbParent="Pages"
              breadCrumbActive="Kelola Gaji"
            />
          </Row>
        </Col>

        <PageTitle pageTitle="Kelola Gaji" />
        <Card
          style={{
            width: '100%',
          }}
        >
          <div style={{ marginTop: 20, width: '100%', padding: 10 }}>
            <Form form={form} layout="horizontal">
              <Row gutter={[20, 20]}>
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
                    <Select placeholder="Pilih Jabatan">
                      {dataJabatan.map((el) => {
                        return (
                          <Select.Option value={el.id}>{el.nama}</Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Row justify="start">
                    <Col>
                      <Button
                        type="primary"
                        loading={loadingView}
                        onClick={handleView}
                      >
                        View
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
            {showComponent ? (
              <>
                <div
                  style={{
                    fontSize: 20,
                    marginTop: 30,
                  }}
                >
                  Penambahan
                </div>
                <Divider />
                <Row
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Col span={24}>
                    <Table
                      columns={columns}
                      loading={antLoading}
                      dataSource={changeValue.filter(
                        (el) => el.tipe === 'Penambahan',
                      )}
                      pagination={false}
                    />
                  </Col>
                </Row>
                <div
                  style={{
                    fontSize: 20,
                    marginTop: 50,
                  }}
                >
                  Pengurangan
                </div>
                <Divider />
                <Row
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Col span={24}>
                    <Table
                      columns={columns}
                      loading={antLoading}
                      dataSource={changeValue.filter(
                        (el) => el.tipe === 'Pengurangan',
                      )}
                      pagination={false}
                    />
                  </Col>
                </Row>
                <Row
                  justify="end"
                  style={{
                    marginTop: 30,
                  }}
                >
                  <Col>
                    <Link to={'/pages/position'}>
                      <Button>Kembali</Button>
                    </Link>
                  </Col>
                  <Col
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <Button type="primary" onClick={handleSubmit}>
                      Simpan
                    </Button>
                  </Col>
                </Row>
              </>
            ) : null}
          </div>
        </Card>
      </Row>
    </>
  )
}
