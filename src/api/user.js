import _http from '@/utils/http'
export default {
  /**
	* 修改用户资料
	*/
  modifyHandle (params) {
    return _http('post', '/user/info/modifyHandle', params)
  },
  /**
	* 登录
	*/
  loginHandle (params) {
    return _http('post', '/user/login/login', params)
  },
  /**
	* 注册
	*/
  registerHandle (params) {
    return _http('post', '/user/login/register', params)
  }
}
