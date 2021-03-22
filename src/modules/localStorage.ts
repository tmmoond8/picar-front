import { isHybrid } from '../modules/crossPlatform';
const STORAGE_KEYS = {
    OWWNERS_UUID: 'OWWNERS_UUID',
    OWWNERS_TOKEN: 'OWWNERS_TOKEN',
} as const;

const storage = {
    getUUID: () => {
        return localStorage.getItem(STORAGE_KEYS.OWWNERS_UUID) || null;
    },
    setUUID: (uuid: string) => {
        localStorage.setItem(STORAGE_KEYS.OWWNERS_UUID, uuid);
    },
    clearUUID: () => {
        localStorage.setItem(STORAGE_KEYS.OWWNERS_UUID, '');
    },
    getOwwnersToken: () => {
        if (isHybrid()) {
            return localStorage.getItem(STORAGE_KEYS.OWWNERS_TOKEN) || null;
        }
        return null;
    },
    setOwwnersToken: (uuid: string) => {
        if (isHybrid()) {
            localStorage.setItem(STORAGE_KEYS.OWWNERS_TOKEN, uuid);
        }
    },
    clearOwwnersToken: () => {
        if (isHybrid()) {
            localStorage.setItem(STORAGE_KEYS.OWWNERS_TOKEN, '');
        }
    },
}

export default storage;