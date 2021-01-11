import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: 'https://apply-backend.herokuapp.com/api/'
})

export default api
