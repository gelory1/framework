import Store from '@store/index'
import Request from '@utils/render.request'
import { getCookie, setCookie } from '@utils/render.utils'
import { tokenApi } from '@/api/user'

// 获取token
const getToken = (flag) => {
  return new Promise((resolve, reject) => {
    // 获取token 相关 如果cookie（后台设置的）中 存在相关信息，flag防止cookie过期后， 第二次继续获取。
    const token = getCookie('token')
    const jsession = getCookie('jsession')
    if (token && jsession && !flag) {
      // sessionStorage.setItem('token', token);
      // sessionStorage.setItem('JsessionId', jsession);
      // console.log('cookie 中的 token'+token);
      resolve()
    } else { // 主动获取
      tokenApi().then(
        function (res) {
          setCookie('token', res.token)
          setCookie('jsession', res.jsession)
          resolve()
        })
    }
  })
}

// 首页获取用户信息
const _getHomePageData = () => {
  return new Promise((resolve, reject) => {
    const pageSetData = Store.getters['common/pageSetData']
    if (pageSetData && pageSetData.type) {
      resolve(pageSetData)
    } else {
      new Request({ key: 'getHomePageData' }).then(res => {
        Store.commit('common/setPageSetData', res)
        Store.commit('common/updateUserInfo', res.userInfo)
        resolve(res)
      })
    }
  })
}

// 首页 先获取token， 在获取用户信息
const getHomePageData = () => {
  return new Promise((resolve, reject) => {
    getToken().then(() => {
      _getHomePageData().then((res) => { resolve(res) })
    })
  })
}
// 公共获取用户信息
const _commonHeaderInfo = () => {
  return new Promise((resolve, reject) => {
    const pageSetData = Store.getters['common/pageSetData']
    if (pageSetData && pageSetData.type) {
      resolve(pageSetData)
    } else {
      new Request({
        key: 'commonHeaderInfo',
        data: {
          isPC: false, pageType: 'HOMEPAGE'
        }
      }).then(res => {
        Store.commit('common/setPageSetData', res)
        Store.commit('common/updateUserInfo', res.userInfo)
        resolve(res)
      })
    }
  })
}
// 公共 先获取token， 在获取用户信息
const commonHeaderInfo = () => {
  return new Promise((resolve, reject) => {
    getToken().then(() => {
      _commonHeaderInfo().then((res) => { resolve(res) })
    })
  })
}

// 登录

const login = () => {

}

export { getHomePageData, getToken, login, commonHeaderInfo }
