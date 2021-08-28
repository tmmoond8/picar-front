interface Browserizr {
  isAndroid (): boolean;
  isAndroid3 (): boolean;
  isAndroid4 (): boolean;
  isAndroid5 (): boolean;
  isAndroid6 (): boolean;
  isAndroid7 (): boolean;
  isAndroid8 (): boolean;
  isMeizuPhone (): boolean;
  isMeizuNotePhone (): boolean;
  isRedmiPhone (): boolean;
  isRedmiNotePhone (): boolean;
  isIPad (): boolean;
  isIPod (): boolean;
  isIPhone (): boolean;
  isIPhone4 (): boolean;
  isIPhone5 (): boolean;
  isIPhone678 (): boolean;
  isIPhone678plus (): boolean;
  isIPhoneX (): boolean;
  isIOS (): boolean;
  isMac (): boolean;
  isMacLike (): boolean;
  isBlackBerry (): boolean;
  isBlackBerry10 (): boolean;
  isMoz (): boolean;
  isOpera (): boolean;
  isSafari (): boolean;
  isChrome (): boolean;
  isIE (): boolean;
  isIE8 (): boolean;
  isIE9 (): boolean;
  isIE10 (): boolean;
  isIE11 (): boolean;
  isEdge (): boolean;
  isEdgeIOS (): boolean;
  isEdgeAndroid (): boolean;
  isWindowsPhone (): boolean;
  isWindows (): boolean;
  isWindowsXP (): boolean;
  isWindowsVista (): boolean;
  isWindows7 (): boolean;
  isWindows8 (): boolean;
  isWindows10 (): boolean;
  isLinux (): boolean;
  isMobile (): boolean;
  isDesktop (): boolean;
  cssClasses (tests: string[], classPrefix: string): string[];
}

let brwoserizr: Browserizr;

const getBrowserizr = () => {
  if (!brwoserizr) {
      import('browserizr').then((module) => {
        const Browserizr = module.default;
        brwoserizr = Browserizr.detect();
      });
  }
  return brwoserizr;
}

  // ios 가 아니면 항상 0
  // ios 도 debice 물리버튼이 있는 버전과 없는 버전
  // 물리 버튼이 없는 버전은 40
  // 물리 버튼이 있으면 36
export const getVirtualKeyboardHeight = () => {
  const browser = getBrowserizr();
  if (!browser) return 40;

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