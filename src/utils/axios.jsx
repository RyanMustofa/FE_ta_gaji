import { notification } from 'antd'
import axios from 'axios'

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
        message: response.data.message,
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
      })
    }
    if (error?.response?.data?.message) {
      notification.error({
        message: error?.response?.data?.message,
      })
    }
    return Promise.reject(error)
  },
)

export default httpRequest
