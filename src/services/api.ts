import axios from 'axios'

const api = axios.create({
  baseURL: 'https://apply-backend.herokuapp.com/api/'
})

export default api
