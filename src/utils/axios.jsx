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
    return Promise.reject(error)
  },
)

export default httpRequest
