/* eslint-disable no-console */

import Vue from 'vue'
/**
 * http错误处理
 */
export const errorDeal = (error) => {
  let errorText = error
  if (errorText.toString().indexOf('timeout') > -1) {
    errorText = '请求超时'
  } else if (error.response) {
    errorText = error.response.statusText
  } else if (error.request) {
    errorText = error.request
  } else if (error.message) {
    errorText = error.message
  } else if (error.msg) {
    errorText = error.msg
  }

  if (error.code == 202) {
    Vue.prototype.$Modal.error({
      content: '登录已过期，请重新登录',
      title: '登录异常',
      type: 'confirm',
      okText: '确定',
      cancelText: '',
      onOk: (instance) => {
        window.location.href = '#/login'
      }
    })
  } else {
    Vue.prototype.$Notice.error({
      title: '错误',
      desc: errorText
    })
  }
}
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  let content = window.localStorage.getItem(name)
  return content ? JSON.parse(content) : ''
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}
/**
 * 时间戳格式化
 */
export const getDateTime = e => {
  var t
  if (!e || e == 'null' || e == '0') return '--'
  t = e == 'now' ? new Date() : new Date(parseInt(e))
  var n = t.getFullYear(),
    a = t.getMonth() + 1,
    r = t.getDate(),
    o = t.getHours(),
    i = t.getMinutes(),
    c = t.getSeconds()
  a >= 10 || (a = '0' + a)
  r >= 10 || (r = '0' + r)
  o >= 10 || (o = '0' + o)
  i >= 10 || (i = '0' + i)
  c >= 10 || (c = '0' + c)
  return n + '-' + a + '-' + r + ' ' + o + ':' + i + ':' + c
}
/**
 * 日期转时间戳
 */
export const getUnixTime = e => {
  var t
  if (e) {
    e = e.replace(/-/g, '/')
    t = new Date(e)
  } else t = new Date()
  return t.getTime().toString()
}
/**
 * 获取地址栏参数
 */
export const getUrlParam = (e, url) => {
  var t = new RegExp('(^|&)' + e + '=([^&]*)(&|$)'),
    n = url ? url.match(t) : window.location.search.substr(1).match(t)
  return n != null ? unescape(n[2]) : ''
}
/**
 * 秒数格式化
 */
export const secondsFormat = (v = 0) => {
  v = parseInt(v)
  var day, minute, second, hour
  day = Math.floor(v / (60 * 60 * 24))
  hour = Math.floor(v % (60 * 60 * 24) / (60 * 60))
  minute = Math.floor(v % (60 * 60) / 60)
  second = Math.floor(v % 60)
  hour < 10 && (hour = '0' + hour)
  minute < 10 && (minute = '0' + minute)
  second < 10 && (second = '0' + second)
  return day != '00' ? day + '天' + hour + ':' + minute + ':' + second
    : hour != '00' ? hour + ':' + minute + ':' + second
      : minute != '00' ? minute + ':' + second : '00:' + second
}
/**
 * 手机格式化
 */
export const phoneFormat = (value, isNum) => {
  if (!value) return '--'
  if (isNum) {
    value = parseInt(value).toString()
  } else value = value.toString()

  let len = value.length, w = value.split('')
  w.splice(3, 0, ' ')
  w.splice(8, 0, ' ')
  w = w.join('')
  return w
}
/**
 * 分转元
 */
export const mathCentToYuan = function (value) {
  return value ? parseFloat((parseFloat(value) / 100).toFixed(2)) : 0.00
}
/**
 * 节流函数
 */
export const debounce = function (time, action) {
  let last
  return function () {
    let ctx = this, args = arguments

    clearTimeout(window.LastDebounce)
    window.LastDebounce = setTimeout(function () {
      action.apply(ctx, args)
    }, time)
  }
}
/**
 * iframe 文件下载
 */
export const createDownload = (url, data, cb) => {
  var body = document.getElementsByTagName('body')[0],
    ifr = document.getElementById('downLoadForm'),
    form = document.createElement('form'),
    input = document.createElement('input')
  if (!ifr) {
    	ifr = document.createElement('iframe')
    	ifr.setAttribute('id', 'downLoadForm')
    	ifr.setAttribute('name', 'downLoadForm')
    	ifr.setAttribute('style', 'display:none')
  }
  cb()
  ifr.addEventListener('load', function (e) {
    	try {
      var res = ifr.contentWindow.document.body.textContent
      if (res != '' && res.indexOf('code') > -1) {
        var result = JSON.parse(res)
        if (res.code != 200) {
          errorDeal(result)
        }
      }
    	} catch (error) {
    		errorDeal(error)
    	}
  })

  form.setAttribute('style', 'display:none')
  form.setAttribute('target', 'downLoadForm')
  form.setAttribute('enctype', 'application/x-www-form-urlencoded;charset=utf-8')
  form.setAttribute('method', 'post')
  form.setAttribute('action', url)

  input.setAttribute('type', 'hidden')
  input.setAttribute('name', 'data')
  input.setAttribute('value', data)

  body.appendChild(ifr)
  body.appendChild(form)

  form.appendChild(input)
  form.submit()
  form.remove()
}
/**
 * 正则验证函数
 */
export const regularValid = function (type, value) {
  let valid = false

  switch (type) {
    case 'float':
      valid = /^[-+]?[0-9]*\.?[0-9]{0,2}$/.test(value)
      break
  }
  return valid
}
/**
 * 数字格式化
*/
export const numberFormat = function (num, pro) {
  return num ? (parseFloat(num) / pro).toFixed(2) : '0.00'
}
