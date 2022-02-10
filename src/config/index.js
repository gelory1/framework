
export default {
  local: {
    host: ''
  },
  dev: {
    host: 'https://dev.xxx.com'
  },
  test: {
    host: 'https://test.xxx.com'
  },
  rc: {
    host: 'https://rc.xxx.com'
  },
  prod: {
    host: 'https://www.xxx.com'
  },
  api: { // 用于配置所有接口 路径
    text: '/aaa/bbb/text'
  },
  config: function () {
    var rootpath = document.location.href
    if (rootpath.match('www.xxx.com')) {
      return this.prod
    } else if (rootpath.match('dev.xxx.com')) {
      return this.dev
    } else if (rootpath.match('test.xxx.com')) {
      return this.test
    } else if (rootpath.match('rc.xxx.com')) {
      return this.rc
    } else if (rootpath.match('localhost')) {
      return this.local
    } else {
      return this.local
    }
  },
  getUrl(key) {
    const { host } = this.config();
    return host + this.api[key];
  }
}
