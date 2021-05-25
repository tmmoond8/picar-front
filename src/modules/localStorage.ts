import { isHybrid } from '../modules/crossPlatform';
const STORAGE_KEYS = {
    PICAR_UUID: 'PICAR_UUID',
    PICAR_TOKEN: 'PICAR_TOKEN',
} as const;

const storage = {
    getUUID: () => {
        return localStorage.getItem(STORAGE_KEYS.PICAR_UUID) || null;
    },
    setUUID: (uuid: string) => {
        localStorage.setItem(STORAGE_KEYS.PICAR_UUID, uuid);
    },
    clearUUID: () => {
        localStorage.setItem(STORAGE_KEYS.PICAR_UUID, '');
    },
    getToken: () => {
        if (isHybrid()) {
            return localStorage.getItem(STORAGE_KEYS.PICAR_TOKEN) || null;
        }
        return null;
    },
    setToken: (uuid: string) => {
        if (isHybrid()) {
            localStorage.setItem(STORAGE_KEYS.PICAR_TOKEN, uuid);
        }
    },
    clearToken: () => {
        if (isHybrid()) {
            localStorage.setItem(STORAGE_KEYS.PICAR_TOKEN, '');
        }
    },
}

export default storage;