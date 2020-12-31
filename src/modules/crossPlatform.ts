import { getPlatforms } from '@ionic/react';
import Browserizr from 'browserizr'

const PLATFORMS = {
    ios: "ios",
    ipad: "ipad",
    iphone: "iphone",
    android: "android",
    phablet: "phablet",
    tablet: "tablet",
    cordova: "cordova",
    capacitor: "capacitor",
    electron: "electron",
    pwa: "pwa",
    mobile: "mobile",
    mobileweb: "mobileweb",
    desktop: "desktop",
    hybrid: "hybrid",
} as const;


let brwoserizr: ReturnType<typeof Browserizr.detect>;
let platform: (keyof typeof PLATFORMS)[];

const getPlatform = () => {
    if (!platform) {
        platform = getPlatforms();
    }
    return platform;
}

const getBrowserizr = () => {
    if (!brwoserizr) {
        brwoserizr =  Browserizr.detect();
    }
    return brwoserizr;
}

export const isIos = () => {
    return getPlatform().includes(PLATFORMS.ios);
}

export const isAndroid = () => {
    return getPlatform().includes(PLATFORMS.android);
}

export const isDesktop = () => {
    return getPlatform().includes(PLATFORMS.desktop);
}

export const isHybrid = () => {
    return getPlatform().includes(PLATFORMS.hybrid);
}

export const isIosAndHybrid = () => {
    return isIos() && isHybrid();
}

export const hasHomeBar = () => {
    const b = getBrowserizr();
    const hasPhysicalButton = b.isIPhone4() || b.isIPhone5() && b.isIPhone678() && b.isIPhone678plus();
    return isIos() && !hasPhysicalButton;
}
