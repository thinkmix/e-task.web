/**
  *@info http request by axios
  *@author: thinkmix
  *@date 2018-11-19
* */
// import Vue from 'vue';
import axios from 'axios'
import { errorDeal, getStore } from '@/utils/utils.js'
import config from '../config'

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  res => res,
  error => {
    return Promise.reject(error)
  }
)
/**
 *@describe http请求
 *@method {String} 请求方式
 *@url {String} 接口地址
 *@params {Object} 对应接口参数
 **/

export default function _http (method = 'post', url, params = {}, headers = {}) {

  params = Object.assign(params, getStore('USER_TOKEN') || {})

  return axios({
    method: method,
    url: config.apiRoot + url,
    headers: Object.assign({
      'Content-Type': 'application/json;charset=UTF-8'
    }, headers),
    params: method === 'get' ? params : '',
    data: params,
    timeout: 30 * 1000,
    withCredentials: false

  }).then(res => {
    if (res && res.data && res.data.code == 200) {
      return res.data
    } else throw res.data
  }).catch(error => {
    errorDeal(error)
  })
}
