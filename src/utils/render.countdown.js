/**
 * 类说明
 * @class countdown
 * @constructor
 */
export default class Countdown {
  /**
	 * http请求
	 * @constructor
	 * @param {Object}
	 * 		startTime	 开始时间
	 * 		endTime 	 结束时间
	 * 		isFormat	 是否给时间做格式转化
	 * 		progress： 	 进度事件
	 * 		complete：	 完成事件
	 * @return {JSON}
	 */
  constructor (params) {
    this.options = params
    this.options.timerNum = null
    this.options.mode = params.mode || 'hours'
    this.updata()
  }
  updata (startTime, endTime) {
    this.options.startTime = startTime || this.options.startTime
    this.options.endTime = endTime || this.options.endTime
    this.options.endTime = this._getTime(this.options.endTime)
    this.options.countTime = this._getTime(this.options.startTime)
    this.stop()
    this.options.timerNum = setInterval(() => { this._timer() }, 1000)
    this._timer()
  }
  //	本地mock接口请求
  _timer () {
    this.options.countTime = this.options.countTime + 1000
    const ts = new Date(this.options.endTime) - new Date(this.options.countTime)
    if (ts <= 0) { this.stop(); this._data(0, 0, 0, 0, true); return false }

    const day = parseInt(ts / 1000 / 60 / 60 / 24, 10)
    let hours = parseInt(ts / 1000 / 60 / 60 % 24, 10)
    const minute = parseInt(ts / 1000 / 60 % 60, 10)
    const second = parseInt(ts / 1000 % 60, 10)
    if (this.options.mode && this.options.mode == "hours") {
      hours = hours + day * 24
    }
    this._data(day, hours, minute, second)
  }
  // 处理数据
  _data (day, hours, minute, second, isComplete) {
    const _day = day < 10 ? ("0" + day) : day
    const _hours = hours < 10 ? ("0" + hours) : hours
    const _minute = minute < 10 ? ("0" + minute) : minute
    const _second = second < 10 ? ("0" + second) : second
    const result = this._timeFormat(_day, _hours, _minute, _second)
    if (isComplete) {
      if (this.options.complete) this.options.complete(result)
    } else {
      if (this.options.progress) this.options.progress(result)
    }
  }
  //	停止
  stop () {
    if (this.options.timerNum)clearInterval(this.options.timerNum)
  }
  // 处理返回格式
  _timeFormat (day, hours, minute, second) {
    if (this.options.mode && this.options.mode == "hours") {
      return { hours: hours, minute: minute, second: second }
    } else {
      return { day: day, hours: hours, minute: minute, second: second }
    }
  }
  // 时间格式处理
  _getTime (time) {
    if (this.options.isFormat) {
      return new Date((time.replace(/\-/g, '/')).replace(/\T/g, ' ')).getTime()
    }
    return time
  }
}
