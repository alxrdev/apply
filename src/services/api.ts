import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://apply-backend.herokuapp.com/api/'
})

export default api
