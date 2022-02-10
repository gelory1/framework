export const echartsSize = function (size, defalteWidth = 1920) {
  // const docEl = document.documentElement;
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return;
  const fontSize = (clientWidth / defalteWidth);
  return Number((size * fontSize).toFixed(3));
}

// 设置系统缩放比，适配各分辨率
export function refreshScale() {
  const baseWidth = document.documentElement.clientWidth;
  const baseHeight = document.documentElement.clientHeight;
  const appStyle = document.getElementById('app').style;
  const realRatio = baseWidth / baseHeight
  const designRatio = 16 / 9
  let scaleRate = baseWidth / 1920
  if (realRatio > designRatio) {
    scaleRate = baseHeight / 1080
  }
  appStyle.transformOrigin = 'left top';
  appStyle.transform = `scale(${scaleRate}) translateX(-50%)`;
  appStyle.width = `${baseWidth / scaleRate}px`
}
