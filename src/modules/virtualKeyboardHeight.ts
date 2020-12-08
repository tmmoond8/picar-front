import Browserizr from 'browserizr'

  // ios 가 아니면 항상 0
  // ios 도 debice 물리버튼이 있는 버전과 없는 버전
  // 물리 버튼이 없는 버전은 40
  // 물리 버튼이 있으면 36
export const getVirtualKeyboardHeight = () => {
  const browser = Browserizr.detect();
  if (!browser.isIOS()) {
    return 0;
  }

  if (browser.isIPhone() 
    || browser.isIPhone4() 
    || browser.isIPhone5() 
    || browser.isIPhone678() 
    || browser.isIPhone678plus()) {
    return 36;
  }

  if (browser.isIPhoneX()) {
    return 40;
  }

  return 40;
}