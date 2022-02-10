/**
 * 节流&防抖
 * @param  {number}    delay         # scroll 监听一般设为 100 - 250
 * @param  {boolean}   [noTrailing]  # 是否执行最后一次调用，默认为 false 即会执行最后一次被节流的调用
 * @param  {Function}  callback      # 不传 noTrailing 则第二个参数作为 callback
 * @param  {boolean}   [debounceMode]# 防抖模式
 *
 * @returns {Function}
 */
function throttle(delay, noTrailing, callback, debounceMode) {
  let timeoutID;
  let cancelled = false;
  let lastExec = 0;
  function cancel() {
    clearTimeout(timeoutID);
    cancelled = true;
  }
  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  function wrapper(...arguments_) {
    const self = this;
    const elapsed = Date.now() - lastExec;
    function exec() { lastExec = Date.now(); callback.apply(self, arguments_); }
    function clear() { timeoutID = undefined; }
    if (cancelled) return;
    // 防抖：执行
    if (debounceMode && !timeoutID) exec();
    // 节流：刷新定时器（服务于Trailing）
    clearTimeout(timeoutID);
    // 节流：最快每 delay 执行一次
    if (debounceMode === undefined && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      // 防抖：delay 时间内只执行一次
      // 节流：执行最后被限流的调用
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      );
    }
  }

  wrapper.cancel = cancel;
  return wrapper;
}

export default throttle;
