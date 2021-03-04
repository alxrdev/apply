import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL || ''

const api = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  proxy: {
    host: apiUrl,
    port: 3333
  }
})

export default api
