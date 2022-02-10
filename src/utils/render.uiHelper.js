/**
 * 配置所有 popup弹窗 用于跟踪维护
 * @method getPopups
 * @param 无
 * @return {Object} 所有 popup 弹窗
 */
export const getPopups = () => {
  return {
    "DeliveryAreaPopup": { name: "DeliveryAreaPopup", isShow: false },
    "PrivacyPolicyPop": { name: "PrivacyPolicyPop", isShow: false },
    "Submenu": { name: "Submenu", isShow: false },
    "ChangerBuyerPopup": { name: "ChangerBuyerPopup", isShow: false },
    "ChooseBuyerPopup": { name: "ChooseBuyerPopup", isShow: false },
    "ExperienceMuseumPop": { name: "ExperienceMuseumPop", isShow: false },
    "MonthEndPopup": { name: "MonthEndPopup", isShow: false },
    "CarveUpIndexPop": { name: "CarveUpIndexPop", isShow: false }, // 瓜分首页提示弹窗
    "SweepstakeIndexPop": { name: "SweepstakeIndexPop", isShow: false }, // 抽奖首页提示弹窗
    "SweepstakeAnimationPop": { name: "SweepstakeAnimationPop", isShow: false }, // 抽奖领取好礼动画弹窗
    "shareCardPop": { name: "shareCardPop", isShow: false }, // 分享卡片弹框
    "TestMergerImgPop": { name: "TestMergerImgPop", isShow: false },
    "SweepstakeOvertimePop": { name: "SweepstakeOvertimePop", isShow: false }, // 抽奖超时弹窗
    "SweepstakePacketPop": { name: "SweepstakePacketPop", isShow: false }, // 红包弹框
    "limitDetailsPop": { name: "limitDetailsPop", isShow: false }, // 微购限购弹窗
    "microJoinCartPop": { name: "microJoinCartPop", isShow: false }// 微购加购弹窗
  }
}

export const getOffsetTop = el => {
  let top = el.offsetTop;
  while ((el = el.offsetParent)) {
    top += el.offsetTop;
  }
  return top;
}

export function scrollToView(el, top = 0) {
  if (!el) return;
  const beginTime = Date.now();
  const beginValue = document.documentElement.scrollTop;
  const targetValue = getOffsetTop(el) - top;
  const diffValue = targetValue - beginValue;
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
  const cubic = value => Math.pow(value, 3);
  const easeInOutCubic = value =>
    value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
  console.log(beginValue, targetValue);
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / 500;
    if (progress < 1) {
      document.documentElement.scrollTop =
        beginValue + diffValue * easeInOutCubic(progress);
      rAF(frameFunc);
    } else {
      document.documentElement.scrollTop = targetValue;
    }
  };
  rAF(frameFunc);
}
