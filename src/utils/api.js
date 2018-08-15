import axios from 'axios'
export async function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return await axios({
    url: '/api/v1/json',
    method: 'get',
    data
  })
}

export async function getUserInfo() {
  return await axios({
    url: '/user/info'
  })
}

export async function refreshToken() {
  return await axios({
    url: 'v1/auth/token'
  })
}
