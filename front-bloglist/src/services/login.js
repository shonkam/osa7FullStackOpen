import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log(credentials)
  const response = await axios.post(baseUrl, credentials)
  console.log(response.data)
  return response.data
}

const getAllUsers = async () => {
  const response = await axios.get('/api/users')
  console.log(response.data)
  return response.data
}
const loginService = {login, getAllUsers}

export default loginService