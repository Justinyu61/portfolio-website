import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, { params }).then((res) => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then((res) => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}
