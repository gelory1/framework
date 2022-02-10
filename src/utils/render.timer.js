/*!
 * Request - v1.0.0 (2018-10-31T22:07:30+0800)
 */
/**
 * 类说明
 * @class Timer
 * @constructor
 */
export default class Timer {
  /**
	 * http请求
	 * @constructor
	 * @param {Object}
	 * 		count： 		计时数量， 默认60
	 * 		progress： 		计时进度事件
	 * 		complete： 		计时结束事件
	 * @return {Number}
	 */
  constructor (options) {
    this.options = options
    this.count = options.count || 60
    this.setIntervalNum = null
    return this.start()
  }
  // 倒计时入口
  start () {
    this.setIntervalNum = window.setInterval(() => { this.enterFrame() }, 1000)
    this.enterFrame()
    return this
  }
  // 开始倒计时
  enterFrame () {
    this.count--
    if (this.options.progress) this.options.progress(this.count)
    if (this.count == 0) {
      if (this.options.complete) this.options.complete()
      this.stop()
    }
  }
  // 停止倒计时
  stop () {
    window.clearInterval(this.setIntervalNum)
  }
}
