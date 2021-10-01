const PLATFORMS = {
  ios: 'ios',
  ipad: 'ipad',
  iphone: 'iphone',
  android: 'android',
  phablet: 'phablet',
  tablet: 'tablet',
  cordova: 'cordova',
  capacitor: 'capacitor',
  electron: 'electron',
  pwa: 'pwa',
  mobile: 'mobile',
  mobileweb: 'mobileweb',
  desktop: 'desktop',
  hybrid: 'hybrid',
} as const;

interface Browserizr {
  isAndroid(): boolean;
  isAndroid3(): boolean;
  isAndroid4(): boolean;
  isAndroid5(): boolean;
  isAndroid6(): boolean;
  isAndroid7(): boolean;
  isAndroid8(): boolean;
  isMeizuPhone(): boolean;
  isMeizuNotePhone(): boolean;
  isRedmiPhone(): boolean;
  isRedmiNotePhone(): boolean;
  isIPad(): boolean;
  isIPod(): boolean;
  isIPhone(): boolean;
  isIPhone4(): boolean;
  isIPhone5(): boolean;
  isIPhone678(): boolean;
  isIPhone678plus(): boolean;
  isIPhoneX(): boolean;
  isIOS(): boolean;
  isMac(): boolean;
  isMacLike(): boolean;
  isBlackBerry(): boolean;
  isBlackBerry10(): boolean;
  isMoz(): boolean;
  isOpera(): boolean;
  isSafari(): boolean;
  isChrome(): boolean;
  isIE(): boolean;
  isIE8(): boolean;
  isIE9(): boolean;
  isIE10(): boolean;
  isIE11(): boolean;
  isEdge(): boolean;
  isEdgeIOS(): boolean;
  isEdgeAndroid(): boolean;
  isWindowsPhone(): boolean;
  isWindows(): boolean;
  isWindowsXP(): boolean;
  isWindowsVista(): boolean;
  isWindows7(): boolean;
  isWindows8(): boolean;
  isWindows10(): boolean;
  isLinux(): boolean;
  isMobile(): boolean;
  isDesktop(): boolean;
  cssClasses(tests: string[], classPrefix: string): string[];
}

let brwoserizr: Browserizr;
let platform: (keyof typeof PLATFORMS)[];

const getPlatform = () => {
  if (!platform && globalThis?.location) {
    import('@ionic/react').then(({ getPlatforms }) => {
      platform = getPlatforms();
    });
  }
  return platform ?? [];
};

const getBrowserizr = () => {
  if (!brwoserizr && globalThis?.location) {
    import('browserizr').then((module) => {
      const Browserizr = module.default;
      brwoserizr = Browserizr.detect();
    });
  }
  return brwoserizr;
};

export const isIos = () => getPlatform().includes(PLATFORMS.ios);
export const isAndroid = () => getPlatform().includes(PLATFORMS.android);
export const isDesktop = () => getPlatform().includes(PLATFORMS.desktop);
export const isHybrid = () => getPlatform().includes(PLATFORMS.hybrid);
export const isIosAndHybrid = () => isIos() && isHybrid();

export const hasHomeBar = async () => {
  const b = await getBrowserizr();
  const hasPhysicalButton =
    b.isIPhone4() || b.isIPhone5() || b.isIPhone678() || b.isIPhone678plus();
  return isIos() && !hasPhysicalButton;
};
