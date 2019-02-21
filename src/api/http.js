
import axios from 'axios'

const successStatus = 'ok'
const successCode = 0
const instance = axios.create({
  baseURL: '/api',
  withCredentials: true, // 跨域类型时是否在请求中协带cookie
})

const instanceH5 = axios.create({
  baseURL: '/',
  withCredentials: true, // 跨域类型时是否在请求中协带cookie
})

export default class HttpUtil {
  static getH5(url, params = {}) {
    return new Promise((resolve, reject) => {
      instanceH5.get(url, { params }).then((res) => {
        if (res.data.status === successStatus) {
          const { data } = res.data
          resolve(data)
        } else {
          reject({ err: res.message, name: res.message || '' })
        }
      }).catch((err) => {
        reject({ err: JSON.stringify(err) })
      })
    })
  }

  static postH5(url, params = {}) {
    return new Promise((resolve, reject) => {
      instanceH5.post(url, params).then((res) => {
        if (res.data.status === successStatus) {
          const { data } = res.data
          resolve(data)
        } else {
          reject({ err: res.errmsg, name: res.name || '' })
        }
      }).catch((err) => {
        reject({ err: JSON.stringify(err) })
      })
    })
  }


  static get(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance.get(url, { params }).then(({ data }) => {
        if (data.code === successCode) {
          const { result } = data
          resolve({ data: result })
        } else {
          reject({ err: data.errmsg, name: data.name || '' })
        }
      }).catch((err) => {
        reject({ err: JSON.stringify(err) })
      })
    })
  }

  static post(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance.post(url, { data: params }).then(({ data }) => {
        if (data.code === successCode) {
          const { result } = data
          resolve({ data: result })
        } else {
          reject({ err: data.errmsg, name: data.name || '' })
        }
      }).catch((err) => {
        reject({ err: JSON.stringify(err) })
      })
    })
  }
}
