import axios from 'axios'

const apiUrl = process.env.APP_API_URL || 'http://localhost:3333/api/'
// const apiPort = Number(process.env.APP_API_PORT || 3333)

const api = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  timeout: 3000
})

export default api
