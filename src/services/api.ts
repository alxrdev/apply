import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
  proxy: {
    host: process.env.REACT_APP_API_URL || '',
    port: 3333
  }
})

export default api
