/**
 * 获取域名中的参数
 * @method getUrlParam
 * @param 无
 * @return {Object} 域名上的参数
 */
export const getUrlParam = () => {
  const obj = {}
  if (window.location.search.indexOf('?') == 0 && window.location.search.indexOf('=') > 1) {
    const strs = decodeURIComponent(window.location.search).substring(1, window.location.search.length).split('&')
    for (let i = 0; i < strs.length; i++) {
      obj[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
    }
  }
  return obj
}

/**
 * @method isWeiXin
 * 判断是否微信浏览器
 * @return {Boolean}
 */
export const isWeiXin = () => {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

/**
 * @method isMobile
 * 判断客户端
 * @return {Boolean}
 */
export const isMobile = () => {
  const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  if (flag && flag.length > 0) {
    return true
  } else {
    return false
  }
}

/**
 * @method isIos
 * 判断客户端是否是ios
 * @return {Boolean}
 */
export const isIos = () => {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

/**
 * 将对象转化为&号分割的字符串
 * @method parseParam
 * @param {Object}
 * 			Object:	任意对象
 * @return {String} &号分割的字符串
 */
export const parseParam = (obj) => {
  const params = []
  if (!obj) return ''
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      const value = obj[i]
      params.push(i + '=' + encodeURIComponent(value === null ? '' : String(value)))
    }
  }
  return params.join('&')
}

/**
 * 判断手机号码是否正确
 * @method isTelephone
 * @param {String}
 * @return {Boolean}
 */
export const isTelephone = (telephone) => {
  return /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/.test(telephone)
}

/**
 * 判断邮箱是否正确
 * @method isEmail
 * @param {String}
 * @return {Boolean}
 */
export const isEmail = (email) => {
  return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email)
}

/**
 * 保留N位小数点
 * @method toFixed
 * @param {String, Int}
 * 		value: 	需要保留小数点的值
 * 		count：	保留几位小数点
 * @return {Number}
 */
export const toFixed = (value, count = 2) => {
  return Number(value).toFixed(count)
}

/**
 * 将对象转化为数组
 * @method objToArray
 * @param {Object}
 * 		obj: 	对象
 * @return {Array}
 */
export const objToArray = (obj) => {
  const arr = []
  for (const i in obj) {
    const itemArr = []
    for (const k in obj[i]) {
      itemArr.push({ key: k, val: obj[i][k] })
    }
    arr.push({ key: i, val: itemArr })
  };
  return arr
}

/**
 * 获取数组中对应的值的索引
 * @method getIndex
 * @param {Array,String,String}
 * 		arr: 	需要检索的数组
 * 		str:	比对的内容
 *      key:	检索数组中的键
 * @return {Array}
 */
export const getIndex = (arr, str, key) => {
  if (!str) return 0

  let index = 0
  arr.map((item, itemIndex) => {
    if (item[key] == str) {
      index = itemIndex
      return index
    }
  })
  return index
}

/**
 * 将毫秒转化为日期
 * @method timestampToDate
 * @param {Number,Boolean}
 * 		timestamp: 	毫秒时间戳
 * 		isYMD:		是否转化为字符串格式
 * @return {String || Array}
 */
export const timestampToDate = (timestamp, isYMD) => {
  if (!timestamp) return "";
  const date = new Date(parseInt(timestamp));
  return isYMD
    ? date.getFullYear() +
        "-" +
        (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) +
        "-" +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
        ' ' +
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ":" +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ":" +
        (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    : [date.getFullYear(), date.getMonth() + 1, date.getDate()];
};
/**
 * 手机号码脱敏
 * @method telephoneDesensitization
 * @param {String}
 * 			str: 	手机号码
 * @return {String}
 */
export const telephoneDesensitization = (str) => {
  if (!str) return str
  return str.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

/**
 * 图片转base64
 * @method imgToBase64
 * @param {Object,Function}
 * 			Object: 	图片相关信息
 * 				url:			图片路径
 *				outputFormat:	图片格式
 *				quality:		图片压缩质量， 只支持jpg格式
 * 			Function:	回调方法
 * @return {String}
 */
export const imgToBase64 = (obj, callback) => {
  if (!obj.url) { callback(obj); return }
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = function () {
    canvas.width = this.width
    canvas.height = this.height
    ctx.drawImage(this, 0, 0, this.width, this.height)
    obj.base64 = canvas.toDataURL(obj.outputFormat || 'image/png', obj.quality || 0.8)
    callback.call(this, obj)
  }
  img.src = obj.url
}

/**
 * file中获取图片url
 * @method fileToImgurl
 * @param {File,Function}
 * 			File: 	图片File对象
 * 			Function:	回调方法
 * @return {String}
 */
export const fileToImgurl = (file, callback) => {
  let reader = new FileReader()
  reader.onload = function (event) { if (callback) { callback(event.target.result) }; reader = null }
  reader.readAsDataURL(file)
}

/**
 * cookie获取指定对象
 * @param {*} key
 */
export const getCookie = (key) => {
  const v = decodeURIComponent(window.document.cookie).match('(^|;) ?' + key + '=([^;]*)(;|$)')
  return v ? v[2] : null
}

/**
 * cookie储存指定对象
 * @param {*} name:		储存的可key
 * @param {*} value:	储存的值
 * @param {*} days:		保留时间，按天计算
 */
export const setCookie = (name, value, days) => {
  const d = new Date(); let valueC = ''
  if (days) {
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * (days || 365))
    valueC = name + '=' + value + ';path=/;expires=' + d.toGMTString()
  } else {
    valueC = name + '=' + value + ';path=/;'
  }
  window.document.cookie = valueC
}

/**
 * 图片合成mergeImage
 * @param {Object}
 * 			width:				合成图片的宽度
 * 			height:				合成图片的高度
 * 			material:			合成图片的所有素材
 * 				type				素材类型： img || text
 * 				img					img类型时传递图片对象
 * 				text				text类型时传递具体文本内容
 * 				font				text类型时传递字体样式
 * 				style				text类型时传递字体颜色
 * 				x					素材所在的x轴
 * 				y					素材所在的y轴
 * 				width				img类型时，素材的宽
 * 				height				img类型是，素材的高
 * @param {Function}:			回调方法， 返回合成的base64数据流
 *
 * example: mergeImage({width:'',height:'',material:[{type:'',img:'',x:0,y:0,width:0,height:0}]},function(base64){})
 */
export const mergeImage = (params, callback) => {
  var canvas = document.createElement('canvas'); var ctx = canvas.getContext('2d')
  canvas.width = params.width
  canvas.height = params.height
  ctx.rect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  const drawing = (n) => {
    if (n < params.material.length) {
      if (params.material[n].type && params.material[n].type == 'text') {
        ctx.font = params.material[n].font
        ctx.fillStyle = params.material[n].style || '#fff'
        const textArr = params.material[n].text.split('\r\n')
        for (let i = 0; i < textArr.length; i++) {
          if (textArr[i]) ctx.fillText(textArr[i], params.material[n].x, params.material[n].y + (30 * i))
        }
      } else {
        if (params.material[n].img) ctx.drawImage(params.material[n].img, params.material[n].x, params.material[n].y, params.material[n].width, params.material[n].height)
      }
      drawing(n + 1)// 递归
    } else {
      // 保存生成作品图片
      if (callback) callback(canvas.toDataURL('image/jpeg', 0.8))
      canvas = null
    };
  }
  drawing(0)
}
