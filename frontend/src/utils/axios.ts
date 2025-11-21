import axios from 'axios'
import { authUtils } from './auth'

// Create axios instance
const apiClient = axios.create({
  baseURL: 'https://parche-lector.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
  },
})

// Request interceptor to add token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = authUtils.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      authUtils.removeToken()
      // Redirect to login will be handled by route guard
    }
    return Promise.reject(error)
  }
)

export default apiClient
