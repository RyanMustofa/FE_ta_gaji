import { notification } from 'antd'
import axios from 'axios'
import { CallSilent, CloseSquare, TickSquare } from 'react-iconly'

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

httpRequest.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] =
      'Bearer ' + window.localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

httpRequest.interceptors.response.use(
  (response) => {
    if (response?.config?.method !== 'get') {
      notification.success({
        message: 'Success',
        description: response.data.message,
        icon: <TickSquare set="curved" className="remix-icon" />,
      })
    }
    return response
  },
  (error) => {
    if (typeof error.response === 'undefined') {
      notification.error({
        message: 'Network Error',
        description:
          'Something is temporarily wrong with your network connection. Please make sure your network connection',
        icon: <CallSilent set="curved" className="remix-icon" />,
      })
    }
    if (error?.response?.data?.message) {
      notification.error({
        message: 'Failed',
        description: error?.response?.data?.message,
        icon: <CloseSquare set="curved" className="remix-icon" />,
      })
    }
    if (error?.response?.status === 401) {
      notification.error({
        message: 'Failed',
        description: error?.response?.data?.message,
        icon: <CloseSquare set="curved" className="remix-icon" />,
      })
      window.localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default httpRequest
