import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const like = async blog => {
  const options = {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: blog.likes += 1 })
  }
  const response = await fetch(`http://localhost:3001/api/blogs/${blog.id}`, options)
  return response.data

}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl} /${id}`, newObject)
  return request.then(response => response.data)
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, create, update, setToken, remove, like }