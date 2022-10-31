import { Button, Modal } from 'antd'
import React from 'react'
import { Delete } from 'react-iconly'

export default function ModalDelete({ visible, onCancel, onOk, loading }) {
  return (
    <Modal title={null} footer={null} visible={visible} onCancel={onCancel}>
      <div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Delete
            set="curved"
            primaryColor="#f50"
            style={{
              width: 100,
              height: 100,
            }}
          />
        </div>
        <div
          style={{
            textAlign: 'center',
            fontWeight: '700',
            marginTop: 20,
            fontSize: 18,
          }}
        >
          Apakah anda yakin mau menghapus data?
        </div>
        <div
          style={{
            textAlign: 'center',
            marginTop: '30px',
          }}
        >
          <Button onClick={onCancel}>Kembali</Button>
          <Button
            loading={loading}
            type="danger"
            onClick={onOk}
            style={{ marginLeft: 20 }}
          >
            Hapus
          </Button>
        </div>
      </div>
    </Modal>
  )
}
